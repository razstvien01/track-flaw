"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ModeToggle } from './components/mode_toggle'
import { ThemeWrapper } from '@/components/theme-wrapper'
import { ThemeCustomizer } from '@/components/theme_customizer'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <ModeToggle/>
      <ThemeCustomizer/>
      
      <ThemeWrapper>
      
      
      <Button>Button</Button>
      
      
      </ThemeWrapper>
    </main>
  )
}
