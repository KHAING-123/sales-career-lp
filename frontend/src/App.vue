<script setup>
import Header from './components/Header.vue'
import HeroSection from './components/HeroSection.vue'
import MembersSection from './components/MembersSection.vue'
import WorkSection from './components/WorkSection.vue'
import ValueSection from './components/ValueSection.vue'
import CareerSection from './components/CareerSection.vue'
import DailySection from './components/DailySection.vue'
import SelectionSection from './components/SelectionSection.vue'
import FinalCTA from './components/FinalCTA.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />
  <main id="top">
    <HeroSection />
    <MembersSection />
    <WorkSection />
    <ValueSection />
    <CareerSection />
    <DailySection />
    <SelectionSection />
    <FinalCTA />
  </main>
  <Footer />
</template>
