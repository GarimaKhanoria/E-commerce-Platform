import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    image: string
    inStock: boolean
  }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-medium">£{product.price.toFixed(2)}</p>
          {!product.inStock && <span className="text-xs text-red-500">Out of stock</span>}
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="default" size="sm" className="w-full" disabled={!product.inStock}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button variant="outline" size="icon" className="shrink-0">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to Wishlist</span>
          </Button>
        </div>
      </div>
      <Link href={`/products/${product.id}`} className="absolute inset-0">
        <span className="sr-only">View {product.name}</span>
      </Link>
    </div>
  )
}
