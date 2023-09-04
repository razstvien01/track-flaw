"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ModeToggle } from './components/mode_toggle'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <ModeToggle/>
      
      
      <Button>Button</Button>
      
      
    </main>
  )
}
