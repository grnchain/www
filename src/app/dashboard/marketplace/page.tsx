'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, Wind, Sun, Droplet } from 'lucide-react'

type Project = {
  id: number
  name: string
  location: string
  organization: string
  certifiedBy: string
  energyCapacity: string
  completionDate: string
  surface: string
  type: 'Wind' | 'Solar' | 'Hydro'
  impactOnSDGs: number
  progress: number
  status: 'Live' | 'Paused' | 'Soon' | 'Finished'
  image: string
  description: string
  co2Reduction: string
  householdsPowered: number
  staking?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    name: "WindForce One",
    location: "North Sea, Netherlands",
    organization: "GreenWind International",
    certifiedBy: "Renewable Energy Certification",
    energyCapacity: "500 MW",
    completionDate: "2026",
    surface: "70 km²",
    type: "Wind",
    impactOnSDGs: 7,
    progress: 35,
    status: "Live",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
    description: "WindForce One is an offshore wind farm project in the North Sea, leveraging cutting-edge wind turbine technology to harness the power of strong sea winds. This project aims to provide clean energy to over 500,000 households in the Netherlands.",
    co2Reduction: "1.5 million tons/year",
    householdsPowered: 500000,
    staking: true
  },
  {
    id: 2,
    name: "SolarVista",
    location: "Atacama Desert, Chile",
    organization: "SunPower Solutions",
    certifiedBy: "Global Solar Council",
    energyCapacity: "800 MW",
    completionDate: "2025",
    surface: "20 km²",
    type: "Solar",
    impactOnSDGs: 8,
    progress: 50,
    status: "Live",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    description: "SolarVista is a large-scale solar farm located in the Atacama Desert, known for its high solar radiation levels. This project utilizes advanced photovoltaic technology to maximize energy capture and storage, providing sustainable power to millions in Chile.",
    co2Reduction: "2 million tons/year",
    householdsPowered: 600000,
    staking: true
  },
  {
    id: 3,
    name: "HydroAlpine",
    location: "Swiss Alps, Switzerland",
    organization: "Alpine Energy Cooperative",
    certifiedBy: "International Hydropower Association",
    energyCapacity: "300 MW",
    completionDate: "2028",
    surface: "5 km²",
    type: "Hydro",
    impactOnSDGs: 12,
    progress: 0,
    status: "Soon",
    image: "https://www.echosciences-paca.fr/uploads/article/image/attachment/1005412393/xl_Visuel_EDF_Renouvelable_Flyer_Entr.png",
    description: "HydroAlpine is an innovative pumped-storage hydroelectric power station in the Swiss Alps. It utilizes the natural elevation differences to generate power during peak demand and store energy during low demand periods, ensuring a stable and renewable energy supply.",
    co2Reduction: "800,000 tons/year",
    householdsPowered: 250000
  },
  {
    id: 4,
    name: "Desert Sun",
    location: "Sahara, Morocco",
    organization: "AfriSun Energy",
    certifiedBy: "Renewable Energy Certification",
    energyCapacity: "2 GW",
    completionDate: "2027",
    surface: "30 km²",
    type: "Solar",
    impactOnSDGs: 9,
    progress: 10,
    status: "Live",
    image: "https://images.unsplash.com/photo-1566093097221-ac2335b09e70?auto=format&fit=crop&w=800&q=80",
    description: "Desert Sun is a massive solar thermal power project in the Sahara Desert. Using concentrated solar power technology, it aims to not only provide renewable energy to Morocco but also export clean energy to Europe via undersea cables.",
    co2Reduction: "5 million tons/year",
    householdsPowered: 1500000
  },
]

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const IconComponent = project.type === 'Wind' ? Wind : project.type === 'Solar' ? Sun : Droplet

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative h-96 rounded-lg overflow-hidden cursor-pointer border-1 border-solid border-zinc-200"
      onClick={onClick}
    >
      <Image src={project.image} alt={project.name} layout="fill" objectFit="cover" />
      <div className="absolute inset-0 " />
      <div className={`${project.status === 'Live' ? 'bg-green-400' : project.status === 'Soon' ? 'bg-yellow-400' : 'bg-gray-400'} text-black text-xs font-bold px-2 py-1 rounded absolute right-10 top-5`}>
              {project.status}
        </div>
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="backdrop-blur-md bg-black/30 rounded-lg p-4 bg-gradient-to-t from-transparent  to-transparent">
          <div className="flex justify-between text-sm mb-2">
            <span className='text-xs text-gray-300'>Up to</span>
            <div className="flex justify-between items-start mb-2 ">
                <h3 className="absolute text-xl font-bold text-white left-1/2 -translate-x-1/2">{project.name}</h3>
            </div>
            <span className='text-xs text-gray-300'>Smart Contracts</span>
          </div>
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>{project.impactOnSDGs}% APY</span>
            <span>{project.progress/100*(project.householdsPowered/1000)} / {project.householdsPowered/1000}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full mb-4">
            <div
              className="h-full bg-green-400 rounded-full"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="text-gray-400">Surface</p>
              <p className="font-bold text-white">{project.surface}</p>
            </div>
            <div>
              <p className="text-gray-400">Type</p>
              <p className="font-bold text-white flex items-center">
                <IconComponent size={14} className="mr-1" />
                {project.type}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Completion</p>
              <p className="font-bold text-white">{project.completionDate}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const IconComponent = project.type === 'Wind' ? Wind : project.type === 'Solar' ? Sun : Droplet

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-black rounded-lg max-w-2xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64">
          <Image src={project.image} alt={project.name} layout="fill" objectFit="cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-green-400 focus:outline-none"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold text-green-400">{project.name}</h2>
              <p className="text-gray-400">Based in {project.location}</p>
            </div>
            <div className="bg-green-400 text-black text-sm font-bold px-2 py-1 rounded flex items-center">
              <IconComponent size={16} className="mr-1" />
              {project.type}
            </div>
          </div>
          <p className="text-gray-300 mb-6">{project.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-500">Organization</p>
              <p className="font-bold">{project.organization}</p>
            </div>
            <div>
              <p className="text-gray-500">Certified by</p>
              <p className="font-bold">{project.certifiedBy}</p>
            </div>
            <div>
              <p className="text-gray-500">Energy Capacity</p>
              <p className="font-bold">{project.energyCapacity}</p>
            </div>
            <div>
              <p className="text-gray-500">Completion Date</p>
              <p className="font-bold">{project.completionDate}</p>
            </div>
            <div>
              <p className="text-gray-500">Surface Area</p>
              <p className="font-bold">{project.surface}</p>
            </div>
            <div>
              <p className="text-gray-500">CO2 Reduction</p>
              <p className="font-bold">{project.co2Reduction}</p>
            </div>
            <div>
              <p className="text-gray-500">Households Powered</p>
              <p className="font-bold">{project.householdsPowered.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Up to </p>
              <p className="font-bold">{project.impactOnSDGs} % APY</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-gray-500 mb-2">Project Progress</p>
            <div className="h-4 bg-gray-700 rounded-full">
              <div
                className="h-full bg-green-400 rounded-full flex items-center justify-end pr-2 text-xs font-bold text-black"
                style={{ width: `${project.progress}%` }}
              >
                {project.progress}%
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{
                scale: project.status === 'Live' ? 1.05 : 1, // Pas d'effet hover si désactivé
                backgroundColor: project.status === 'Live' ? 'rgba(34, 197, 94, 0.2)' : 'inherit',
            }}
            whileTap={{
                scale: project.status === 'Live' ? 0.95 : 1, // Pas d'effet tap si désactivé
            }}
            className={`w-full py-3 px-4 ${
                project.status === 'Live' ? 'bg-green-400 hover:bg-green-500' : 'bg-gray-400 cursor-not-allowed'
            } text-black font-semibold rounded-md transition-colors duration-300`}
            disabled={project.status !== 'Live'}
            >
            Invest Now
            </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function RenewableMarketplace() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <div className="min-h-screen bg-black/50 backdrop-blur-lg text-white font-['Space_Grotesk',sans-serif] p-8 rounded-xl ">
      <h1 className="text-3xl font-bold mb-8 text-white">RENEWABLE ENERGY PROJECTS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}