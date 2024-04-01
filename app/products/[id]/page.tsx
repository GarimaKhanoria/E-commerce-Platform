"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input"
import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock product data
const product = {
  id: "1",
  name: "Marble White Hexagon",
  description:
    "Elegant hexagonal marble tiles for a luxurious finish. These premium quality tiles are perfect for creating stunning feature walls or floors in bathrooms, kitchens, or any space where you want to add a touch of sophistication.",
  price: 49.99,
  images: [
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
    "/placeholder.svg?height=500&width=500",
  ],
  category: "Marble",
  color: "White",
  material: "Marble",
  size: "10x10cm",
  thickness: "10mm",
  finish: "Polished",
  usage: "Wall & Floor",
  itemsPerBox: 10,
  coverage: "1m² per box",
  inStock: true,
  rating: 4.5,
  reviews: 24,
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart`,
    })
  }

  const addToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${product.name} added to your wishlist`,
    })
  }

  const requestSample = () => {
    router.push(`/samples?product=${params.id}`)
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
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
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
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/collections/${product.category.toLowerCase()}`}>
                  {product.category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{product.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1fr_500px]">
            <div className="space-y-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`${product.name} - Image ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div key={index} className="cursor-pointer overflow-hidden rounded-md border">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : i < product.rating
                              ? "fill-yellow-400 text-yellow-400 [clip-path:inset(0_50%_0_0)]"
                              : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold">£{product.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Price per tile. VAT included.</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium">Quantity</p>
                <div className="flex items-center">
                  <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                    className="mx-2 h-9 w-16 text-center"
                  />
                  <Button variant="outline" size="icon" onClick={increaseQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button className="flex-1" onClick={addToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" onClick={addToWishlist}>
                  <Heart className="mr-2 h-4 w-4" />
                  Add to Wishlist
                </Button>
              </div>
              <Button variant="secondary" className="w-full" onClick={requestSample}>
                Request Sample
              </Button>
              <div className="rounded-md bg-muted p-4 text-sm">
                <p className="font-medium">{product.inStock ? "In Stock" : "Out of Stock"}</p>
                <p className="text-muted-foreground">
                  {product.inStock
                    ? "Usually dispatched within 2-3 working days"
                    : "This item is currently out of stock"}
                </p>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="delivery">Delivery</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="space-y-4 pt-4">
                  <p>{product.description}</p>
                </TabsContent>
                <TabsContent value="specifications" className="pt-4">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 border-b py-2">
                      <span className="font-medium">Material</span>
                      <span>{product.material}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b py-2">
                      <span className="font-medium">Color</span>
                      <span>{product.color}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b py-2">
                      <span className="font-medium">Size</span>
                      <span>{product.size}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b py-2">
                      <span className="font-medium">Thickness</span>
                      <span>{product.thickness}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b py-2">
                      <span className="font-medium">Finish</span>
                      <span>{product.finish}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b py-2">
                      <span className="font-medium">Usage</span>
                      <span>{product.usage}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b py-2">
                      <span className="font-medium">Items Per Box</span>
                      <span>{product.itemsPerBox}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-2">
                      <span className="font-medium">Coverage</span>
                      <span>{product.coverage}</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="delivery" className="space-y-4 pt-4">
                  <p>We offer the following delivery options:</p>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 border-b py-2">
                      <span className="font-medium">Standard Delivery</span>
                      <span>3-5 working days (£4.99)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-b py-2">
                      <span className="font-medium">Express Delivery</span>
                      <span>1-2 working days (£9.99)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 py-2">
                      <span className="font-medium">Free Delivery</span>
                      <span>On orders over £100</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
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
