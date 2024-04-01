"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ShoppingCart, Search, Filter } from "lucide-react"
import { ProductCard } from "@/components/shop/product-card"

// Mock data for products
const products = [
  {
    id: "1",
    name: "Marble White Hexagon",
    description: "Elegant hexagonal marble tiles for a luxurious finish.",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Marble",
    color: "White",
    material: "Marble",
    size: "10x10cm",
    inStock: true,
  },
  {
    id: "2",
    name: "Slate Grey Large Format",
    description: "Contemporary large format slate tiles for modern spaces.",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Slate",
    color: "Grey",
    material: "Slate",
    size: "60x60cm",
    inStock: true,
  },
  {
    id: "3",
    name: "Terracotta Mosaic",
    description: "Warm terracotta mosaic tiles for a Mediterranean feel.",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Terracotta",
    color: "Orange",
    material: "Terracotta",
    size: "5x5cm",
    inStock: true,
  },
  {
    id: "4",
    name: "Porcelain Wood Effect",
    description: "Realistic wood-effect porcelain tiles for durability and style.",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Porcelain",
    color: "Brown",
    material: "Porcelain",
    size: "20x120cm",
    inStock: true,
  },
  {
    id: "5",
    name: "Ceramic Subway Tile",
    description: "Classic subway tiles for a timeless look.",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Ceramic",
    color: "White",
    material: "Ceramic",
    size: "10x20cm",
    inStock: false,
  },
  {
    id: "6",
    name: "Limestone Beige Square",
    description: "Natural limestone tiles with a warm beige tone.",
    price: 54.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Limestone",
    color: "Beige",
    material: "Limestone",
    size: "30x30cm",
    inStock: true,
  },
  {
    id: "7",
    name: "Glass Mosaic Blue",
    description: "Vibrant blue glass mosaic tiles for feature walls.",
    price: 44.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Glass",
    color: "Blue",
    material: "Glass",
    size: "2.5x2.5cm",
    inStock: true,
  },
  {
    id: "8",
    name: "Granite Black Polished",
    description: "Luxurious polished black granite tiles for a sophisticated finish.",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Granite",
    color: "Black",
    material: "Granite",
    size: "40x40cm",
    inStock: true,
  },
]

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortOption, setSortOption] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  const categories = [...new Set(products.map((product) => product.category))]
  const colors = [...new Set(products.map((product) => product.color))]
  const materials = [...new Set(products.map((product) => product.material))]

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const toggleMaterial = (material: string) => {
    setSelectedMaterials((prev) => (prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]))
  }

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        (selectedColors.length === 0 || selectedColors.includes(product.color)) &&
        (selectedMaterials.length === 0 || selectedMaterials.includes(product.material)) &&
        (!inStockOnly || product.inStock) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1],
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price
        case "price-high-low":
          return b.price - a.price
        case "name-a-z":
          return a.name.localeCompare(b.name)
        case "name-z-a":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

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
      <div className="container px-4 py-6 md:py-8">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold md:text-3xl">Shop All Tiles</h1>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-8 sm:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                  <SelectItem value="name-z-a">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4" />
                <span className="sr-only">Toggle filters</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
          <div className={`space-y-4 ${showFilters ? "block" : "hidden md:block"}`}>
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 font-medium">Price Range</h3>
              <div className="space-y-4">
                <Slider defaultValue={[0, 100]} max={100} step={1} value={priceRange} onValueChange={setPriceRange} />
                <div className="flex items-center justify-between">
                  <span>£{priceRange[0]}</span>
                  <span>£{priceRange[1]}</span>
                </div>
              </div>
            </div>
            <Accordion type="multiple" className="rounded-lg border">
              <AccordionItem value="categories">
                <AccordionTrigger className="px-4">Categories</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category)}
                        />
                        <Label htmlFor={`category-${category}`}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="colors">
                <AccordionTrigger className="px-4">Colors</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-2">
                    {colors.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-${color}`}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={() => toggleColor(color)}
                        />
                        <Label htmlFor={`color-${color}`}>{color}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="materials">
                <AccordionTrigger className="px-4">Materials</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="space-y-2">
                    {materials.map((material) => (
                      <div key={material} className="flex items-center space-x-2">
                        <Checkbox
                          id={`material-${material}`}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={() => toggleMaterial(material)}
                        />
                        <Label htmlFor={`material-${material}`}>{material}</Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="rounded-lg border p-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" checked={inStockOnly} onCheckedChange={() => setInStockOnly(!inStockOnly)} />
                <Label htmlFor="in-stock">In Stock Only</Label>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSelectedCategories([])
                setSelectedColors([])
                setSelectedMaterials([])
                setInStockOnly(false)
                setPriceRange([0, 100])
              }}
            >
              Clear Filters
            </Button>
          </div>
          <div>
            {filteredProducts.length === 0 ? (
              <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border">
                <p className="text-lg font-medium">No products found</p>
                <p className="text-muted-foreground">Try adjusting your filters or search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
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
