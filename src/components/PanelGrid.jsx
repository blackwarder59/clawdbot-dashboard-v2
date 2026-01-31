import { useStore } from '../store'
import Panel from './Panel'
import { motion, AnimatePresence } from 'framer-motion'

function PanelGrid() {
  const panels = useStore((state) => state.panels)

  return (
    <div className="h-[calc(100vh-4rem)] overflow-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 auto-rows-max">
        <AnimatePresence mode="popLayout">
          {panels.map((panel, index) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Panel panel={panel} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PanelGrid
