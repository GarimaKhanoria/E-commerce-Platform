import { NextResponse } from "next/server"

// Mock categories data
const categories = [
  {
    id: "1",
    name: "Marble",
    description: "Luxurious marble tiles for elegant spaces",
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
  },
  {
    id: "2",
    name: "Slate",
    description: "Natural slate tiles for a rustic feel",
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
  },
  {
    id: "3",
    name: "Terracotta",
    description: "Warm terracotta tiles for Mediterranean style",
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
  },
  {
    id: "4",
    name: "Porcelain",
    description: "Durable porcelain tiles for any space",
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
  },
  {
    id: "5",
    name: "Ceramic",
    description: "Versatile ceramic tiles for walls and floors",
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
  },
  {
    id: "6",
    name: "Limestone",
    description: "Natural limestone tiles with unique patterns",
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
  },
  {
    id: "7",
    name: "Glass",
    description: "Stunning glass tiles for feature walls",
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
  },
  {
    id: "8",
    name: "Granite",
    description: "Hard-wearing granite tiles for high-traffic areas",
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
  },
]

export async function GET(request: Request) {
  // Get URL parameters
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get("featured")

  // Filter categories based on parameters
  let filteredCategories = [...categories]

  if (featured === "true") {
    filteredCategories = filteredCategories.filter((category) => category.featured)
  }

  return NextResponse.json(filteredCategories)
}

export async function POST(request: Request) {
  try {
    const category = await request.json()

    // In a real app, you would validate the category data
    // and save it to a database

    // For this demo, we'll just return the category with a new ID
    const newCategory = {
      ...category,
      id: (categories.length + 1).toString(),
    }

    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 400 })
  }
}
