'use client'

// import {createProvider} from 'next-zustand';

import { createProvider } from '../../../../src'
import { shallow } from 'zustand/shallow'

export type Store = {
  count: number,
  post: {
    id: number,
    name: string,
    description: {
      title: string,
      subtitle: string
    }
  }
  setPrevCount: () => void;
  setNextCount: () => void;
  setSubtitle: (subtitle: string) => void;
};

const creators = createProvider<Store>()(
  (set) => ({
    count: 0,
    post: {
      id: 0,
      name: 'first',
      description: {
        title: 'Test post',
        subtitle: 'about post'
      }
    },
    setPrevCount: () => {
      set((state) => ({ count: state.count - 1 }))
    },
    setNextCount: () => {
      set((state) => ({ count: state.count + 1 }))
    },
    setSubtitle: (subtitle) => {
      set((state) => ({
        post: {
          ...state.post,
          description: {
            ...state.post.description,
            subtitle
          }
        }
      }))
    }
  }), shallow
)

export const useStore = creators.getUseStore()
export const Provider = creators.Provider
