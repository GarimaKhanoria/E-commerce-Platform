"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Box, LayoutDashboard, Package, Settings, ShoppingCart, Tag, Truck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex h-14 items-center border-b px-4">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Package className="h-5 w-5" />
            <span>TileHaven Admin</span>
          </Link>
          <SidebarTrigger className="ml-auto md:hidden" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/admin"}>
                <Link href="/admin">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname?.startsWith("/admin/products")}>
                <Link href="/admin/products">
                  <Box className="h-4 w-4" />
                  <span>Products</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname?.startsWith("/admin/categories")}>
                <Link href="/admin/categories">
                  <Tag className="h-4 w-4" />
                  <span>Categories</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname?.startsWith("/admin/orders")}>
                <Link href="/admin/orders">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Orders</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname?.startsWith("/admin/customers")}>
                <Link href="/admin/customers">
                  <Users className="h-4 w-4" />
                  <span>Customers</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname?.startsWith("/admin/suppliers")}>
                <Link href="/admin/suppliers">
                  <Truck className="h-4 w-4" />
                  <span>Suppliers</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname?.startsWith("/admin/promotions")}>
                <Link href="/admin/promotions">
                  <Tag className="h-4 w-4" />
                  <span>Promotions</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname?.startsWith("/admin/analytics")}>
                <Link href="/admin/analytics">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname?.startsWith("/admin/settings")}>
                <Link href="/admin/settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@tilehaven.com</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
