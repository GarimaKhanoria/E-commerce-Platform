"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ImagePlus, X } from "lucide-react"

interface ImageUploadProps {
  images: string[]
  setImages: (images: string[]) => void
  maxImages?: number
}

export function ImageUpload({ images, setImages, maxImages = 5 }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    if (images.length >= maxImages) return

    const newImages = [...images]

    for (let i = 0; i < files.length; i++) {
      if (newImages.length >= maxImages) break

      const file = files[i]
      if (file.type.startsWith("image/")) {
        // In a real app, you would upload the file to a server
        // and get back a URL. For this demo, we'll use a placeholder.
        newImages.push("/placeholder.svg?height=200&width=200")
      }
    }

    setImages(newImages)
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  return (
    <div className="space-y-4">
      <div
        className={`flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-4 transition-colors ${
          dragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
        <p className="mb-1 text-sm font-medium">Drag & drop images here</p>
        <p className="text-xs text-muted-foreground">
          PNG, JPG, GIF up to 10MB
          {maxImages && ` (${images.length}/${maxImages})`}
        </p>
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          disabled={images.length >= maxImages}
        />
      </div>
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((image, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-2">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Uploaded image ${index + 1}`}
                  className="aspect-square rounded-md object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2 h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeImage(index)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
