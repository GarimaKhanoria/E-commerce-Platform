"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, CreditCard, Truck } from "lucide-react"

// Mock cart data
const cartItems = [
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

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [shippingMethod, setShippingMethod] = useState("standard")

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      postcode: "",
      country: "UK",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      saveInfo: false,
      notes: "",
    },
  })

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const shipping = shippingMethod === "express" ? 9.99 : 4.99
  const tax = subtotal * 0.2
  const total = subtotal + shipping + tax

  function onSubmit(data: any) {
    console.log(data)
    // In a real app, you would process the payment and create the order
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
    })
    router.push("/order-confirmation")
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
          <div className="mb-6 flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/cart">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold md:text-3xl">Checkout</h1>
          </div>
          <div className="grid gap-6 md:grid-cols-[1fr_350px]">
            <div className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                      <CardDescription>Enter your contact details for order confirmation</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Smith" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="john.smith@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="07123 456789" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                      <CardDescription>Enter your shipping address for delivery</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="address1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 1</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 2 (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Apartment, suite, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="London" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="postcode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postcode</FormLabel>
                              <FormControl>
                                <Input placeholder="SW1A 1AA" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="UK">United Kingdom</SelectItem>
                                <SelectItem value="US">United States</SelectItem>
                                <SelectItem value="CA">Canada</SelectItem>
                                <SelectItem value="AU">Australia</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Shipping Method</CardTitle>
                      <CardDescription>Choose your preferred shipping method</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                        <div className="flex items-center space-x-2 rounded-md border p-4">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex flex-1 cursor-pointer items-center justify-between">
                            <div className="space-y-1">
                              <p className="font-medium">Standard Delivery</p>
                              <p className="text-sm text-muted-foreground">3-5 working days</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">£4.99</p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rounded-md border p-4">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="flex flex-1 cursor-pointer items-center justify-between">
                            <div className="space-y-1">
                              <p className="font-medium">Express Delivery</p>
                              <p className="text-sm text-muted-foreground">1-2 working days</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">£9.99</p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Information</CardTitle>
                      <CardDescription>Enter your payment details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name on Card</FormLabel>
                            <FormControl>
                              <Input placeholder="John Smith" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="1234 5678 9012 3456" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="cardExpiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cardCvc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVC</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Information</CardTitle>
                      <CardDescription>Add any special instructions or notes</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Order Notes (Optional)</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Any special delivery instructions or notes for your order"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="saveInfo"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Save my information for faster checkout next time</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  <Button type="submit" className="w-full">
                    <CreditCard className="mr-2 h-4 w-4" /> Place Order
                  </Button>
                </form>
              </Form>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>{cartItems.length} item(s) in your cart</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>£{shipping.toFixed(2)}</span>
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
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="mr-2 h-4 w-4" /> Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Standard Delivery:</span> 3-5 working days (£4.99)
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Express Delivery:</span> 1-2 working days (£9.99)
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Free Delivery:</span> On orders over £100
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
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
