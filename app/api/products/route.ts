import { NextResponse } from "next/server"

// Mock products data
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

export async function GET(request: Request) {
  // Get URL parameters
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const color = searchParams.get("color")
  const material = searchParams.get("material")
  const inStock = searchParams.get("inStock")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const sort = searchParams.get("sort")

  // Filter products based on parameters
  let filteredProducts = [...products]

  if (category) {
    filteredProducts = filteredProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
  }

  if (color) {
    filteredProducts = filteredProducts.filter((product) => product.color.toLowerCase() === color.toLowerCase())
  }

  if (material) {
    filteredProducts = filteredProducts.filter((product) => product.material.toLowerCase() === material.toLowerCase())
  }

  if (inStock === "true") {
    filteredProducts = filteredProducts.filter((product) => product.inStock)
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price >= Number.parseFloat(minPrice))
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price <= Number.parseFloat(maxPrice))
  }

  // Sort products
  if (sort) {
    switch (sort) {
      case "price-low-high":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "name-a-z":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name-z-a":
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
        break
      default:
        // Default sorting (featured)
        break
    }
  }

  return NextResponse.json(filteredProducts)
}

export async function POST(request: Request) {
  try {
    const product = await request.json()

    // In a real app, you would validate the product data
    // and save it to a database

    // For this demo, we'll just return the product with a new ID
    const newProduct = {
      ...product,
      id: (products.length + 1).toString(),
    }

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 400 })
  }
}
