import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'
export default defineConfig({
  plugins: [vue()
 ],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'src')
    }
  },
  build:{
    lib:{
      entry: path.resolve(__dirname,'src/index.ts'),
      name: 'VElement',
      filename: 'v-element'
    },
    rollupOptions:{
      external:['vue', '@fortawesome/fontawesome-svg-core', '@fortawesome/free-solid-svg-icons', '@fortawesome/vue-fontawesome'],
      output:{
        exports: 'named',
        globals: {
          vue: 'Vue'
        },
        assetFileNames: (chunkInfo) =>{
          if(chunkInfo.name === 'style.css'){
            return 'index.css'
          }
          return chunkInfo.name
      }
      },
    }
  }
})
