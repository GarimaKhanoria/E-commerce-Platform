"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowRight, Minus, Plus, ShoppingCart, Trash } from "lucide-react"

// Mock cart data
const initialCartItems = [
  {
    id: "1",
    name: "Marble White Hexagon",
    price: 49.99,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    name: "Slate Grey Large Format",
    price: 59.99,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setPromoApplied(true)
    }
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 100 ? 0 : 4.99
  const tax = (subtotal - discount) * 0.2
  const total = subtotal - discount + shipping + tax

  const proceedToCheckout = () => {
    router.push("/checkout")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 text-lg font-semibold">
            <Link href="/" className="flex items-center gap-2">
              TileHaven
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 md:py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold md:text-3xl">Your Cart</h1>
            <p className="text-muted-foreground">Review your items before checking out</p>
          </div>
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border py-12">
              <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
              <p className="mb-6 text-muted-foreground">Looks like you haven't added any products to your cart yet.</p>
              <Link href="/shop">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_350px]">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cart Items</CardTitle>
                    <CardDescription>You have {cartItems.length} item(s) in your cart</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="h-16 w-16 rounded-md object-cover"
                                />
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-muted-foreground">£{item.price.toFixed(2)} each</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-12 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">£{(item.price * item.quantity).toFixed(2)}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href="/shop">
                      <Button variant="outline">Continue Shopping</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-£{discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "Free" : `£${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>VAT (20%)</span>
                      <span>£{tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>£{total.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={applyPromoCode} disabled={promoApplied}>
                        Apply
                      </Button>
                    </div>
                    {promoApplied && <p className="text-sm text-green-600">Promo code applied successfully!</p>}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={proceedToCheckout}>
                      Checkout <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">Our customer service team is available to assist you with any questions.</p>
                    <p className="text-sm font-medium">Call us: 0800 123 4567</p>
                    <p className="text-sm">Monday to Friday, 9am - 5pm</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="mt-auto border-t bg-muted">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/shop" className="text-muted-foreground hover:text-foreground">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="text-muted-foreground hover:text-foreground">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link href="/samples" className="text-muted-foreground hover:text-foreground">
                    Request Samples
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="/delivery" className="text-muted-foreground hover:text-foreground">
                    Delivery Information
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TileHaven. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
