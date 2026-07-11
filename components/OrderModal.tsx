'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { buildWhatsAppMessage, type Fulfilment } from '@/lib/site';
import type { Product } from '@/lib/products';
import { trackOrder } from '@/lib/api';
import { useSettings } from './SettingsProvider';
import ProductVisual from './ProductVisual';

/**
 * OrderModal + OrderProvider — the conversion engine.
 *
 * Any "Order" button calls `openOrder(product)`. A single luxe modal lets the
 * customer pick size, quantity and pickup/delivery, then launches WhatsApp with
 * the exact pre-filled message. One modal instance for the whole app = fast,
 * consistent, mobile-first.
 */

interface OrderCtx {
  openOrder: (p: Product) => void;
}
const Ctx = createContext<OrderCtx | null>(null);

export function useOrder() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useOrder must be used within OrderProvider');
  return ctx;
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const s = useSettings();
  const [product, setProduct] = useState<Product | null>(null);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [flavor, setFlavor] = useState<string | undefined>(undefined);
  const [fulfilment, setFulfilment] = useState<Fulfilment>('Pickup');
  const [custName, setCustName] = useState('');
  const [address, setAddress] = useState('');

  const openOrder = useCallback((p: Product) => {
    setProduct(p);
    setSizeIdx(0);
    setQty(1);
    setFlavor(p.flavors?.[0]);
    setFulfilment('Pickup');
    setCustName('');
    setAddress('');
    document.documentElement.classList.add('lenis-stopped');
  }, []);

  const close = useCallback(() => {
    setProduct(null);
    document.documentElement.classList.remove('lenis-stopped');
  }, []);

  const size = product?.sizes[sizeIdx];
  const lineTotal = size ? size.price * qty : 0;

  const waLink =
    product && size
      ? `https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(
          buildWhatsAppMessage({
            product: product.name,
            quantity: qty,
            size: size.label,
            flavor,
            fulfilment,
            name: custName,
            address,
          }),
        )}`
      : '#';

  return (
    <Ctx.Provider value={{ openOrder }}>
      {children}

      <AnimatePresence>
        {product && size && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* backdrop */}
            <button
              aria-label="Close order dialog"
              onClick={close}
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            />

            {/* sheet / card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Order ${product.name}`}
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[92svh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-cream-warm shadow-lift sm:rounded-3xl"
            >
              {/* banner image — fixed height crops any image cleanly, never bloats the modal */}
              <div className="relative h-44 w-full flex-none sm:h-52">
                <ProductVisual
                  accent={product.accent}
                  emoji={product.emoji}
                  name={product.name}
                  image={product.image}
                  rounded="rounded-none"
                />
                <button
                  onClick={close}
                  aria-label="Close"
                  className="absolute right-3 top-3 z-40 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
                >
                  ✕
                </button>
              </div>

              {/* scrollable details */}
              <div className="flex-1 overflow-y-auto p-6">
                <div>
                  <p className="eyebrow">{product.tagline}</p>
                  <h3 className="mt-1 font-display text-2xl text-teal">{product.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {product.description}
                  </p>

                  {/* flavour */}
                  {product.flavors && product.flavors.length > 0 && (
                    <div className="mt-5">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide2 text-ink/60">
                        Choose a flavour
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {product.flavors.map((f) => (
                          <button
                            key={f}
                            onClick={() => setFlavor(f)}
                            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                              f === flavor
                                ? 'border-teal bg-teal text-cream-warm'
                                : 'border-ink/15 text-ink/70 hover:border-teal'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* size */}
                  <div className="mt-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide2 text-ink/60">
                      Size
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s, i) => (
                        <button
                          key={s.label}
                          onClick={() => setSizeIdx(i)}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                            i === sizeIdx
                              ? 'border-teal bg-teal text-cream-warm'
                              : 'border-ink/15 text-ink/70 hover:border-teal'
                          }`}
                        >
                          {s.label} · Rs {s.price}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* toppings hint */}
                  {product.toppings && (
                    <p className="mt-4 text-xs text-ink/50">
                      Add-ons available: {product.toppings.join(', ')}. Mention them on WhatsApp.
                    </p>
                  )}

                  {/* customer name */}
                  <div className="mt-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide2 text-ink/60">
                      Your name
                    </p>
                    <input
                      type="text"
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      placeholder="e.g. Ayesha"
                      className="w-full rounded-2xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-teal focus:ring-2 focus:ring-gold/30"
                    />
                  </div>

                  {/* quantity + fulfilment */}
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide2 text-ink/60">
                        Quantity
                      </p>
                      <div className="inline-flex items-center rounded-full border border-ink/15">
                        <button
                          onClick={() => setQty((q) => Math.max(1, q - 1))}
                          className="flex h-10 w-10 items-center justify-center text-lg text-teal"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
                        <button
                          onClick={() => setQty((q) => Math.min(20, q + 1))}
                          className="flex h-10 w-10 items-center justify-center text-lg text-teal"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide2 text-ink/60">
                        Order type
                      </p>
                      <div className="inline-flex rounded-full border border-ink/15 p-1">
                        {(['Pickup', 'Delivery'] as Fulfilment[]).map((f) => (
                          <button
                            key={f}
                            onClick={() => setFulfilment(f)}
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                              fulfilment === f ? 'bg-gold text-ink' : 'text-ink/60'
                            }`}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* delivery address (only when Delivery) */}
                  {fulfilment === 'Delivery' && (
                    <div className="mt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide2 text-ink/60">
                        Delivery address
                      </p>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={2}
                        placeholder="House / street, area, city…"
                        className="w-full resize-none rounded-2xl border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-teal focus:ring-2 focus:ring-gold/30"
                      />
                    </div>
                  )}

                  {/* total + CTA */}
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-ink/50">Estimated total</p>
                      <p className="font-display text-2xl text-teal">Rs {lineTotal}</p>
                    </div>
                  </div>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackOrder({
                        product: product.name,
                        flavor,
                        size: size.label,
                        qty,
                        price: size.price,
                        fulfilment,
                        name: custName,
                        address,
                      });
                      close();
                    }}
                    className="btn-whatsapp mt-4 w-full"
                  >
                    <WhatsAppIcon /> Order on WhatsApp
                  </a>
                  <p className="mt-2 text-center text-[11px] text-ink/40">
                    Opens WhatsApp with your order pre-filled · {''}
                    Final confirmation by our team
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

export function WhatsAppIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.057 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.523 5.276l-.999 3.648 3.965-1.023zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.241-.579-.486-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}
