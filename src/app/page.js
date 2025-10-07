import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/Hero'        // <— pakai ini
import RolesStrip from '@/components/RolesStrip'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/ui/Footer'

export default function Home(){
  return (
    <>
      <Navbar />
      <main className="space-y-16 md:space-y-24">
        <Hero />                 {/* <— tanpa background image */}
        <RolesStrip />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
