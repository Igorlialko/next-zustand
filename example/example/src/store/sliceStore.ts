'use client'

import { createProvider } from 'next-zustand'
import { StateCreator } from 'zustand'

export interface ICountSlice {
  count: number,
  setPrevCount: () => void;
  setNextCount: () => void;
}

type TCountSlice = {
  countSlice: ICountSlice
}

export interface IPostSlice {
  post: {
    id: number,
    name: string,
    description: {
      title: string,
      subtitle: string
    }
  }
  setSubtitle: (subtitle: string) => void;
}

type TPostSlice = {
  postSlice: IPostSlice
}

export type StoreSlice = TCountSlice & TPostSlice

const createCountSlice: StateCreator<StoreSlice,
  [],
  [],
  TCountSlice> = (set) => ({
  countSlice: {
    count: 0,
    setPrevCount: () => {
      set((state) => ({
        ...state,
        countSlice: {
          ...state.countSlice,
          count: state.countSlice.count - 1
        }
      }))
    },
    setNextCount: () => {
      set((state) => ({
        ...state,
        countSlice: {
          ...state.countSlice,
          count: state.countSlice.count + 1
        }
      }))
    }
  }
})
const createPostSlice: StateCreator<StoreSlice,
  [],
  [],
  TPostSlice> = (set) => ({
  postSlice: {
    post: {
      id: 0,
      name: 'first',
      description: {
        title: 'Test post',
        subtitle: 'about post'
      }
    },
    setSubtitle: (subtitle) => {
      set((state) => ({
        postSlice:{
          ...state.postSlice,
          post: {
            ...state.postSlice.post,
            description: {
              ...state.postSlice.post.description,
              subtitle
            }
          }
        }
      }))
    }
  }
})

export const { Provider: SliceProvider, useStore: useStoreSlice } = createProvider<StoreSlice>()(
  (...a) => ({
    ...createCountSlice(...a),
    ...createPostSlice(...a)
  })
)
