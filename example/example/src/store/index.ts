'use client'

import {createProvider} from 'next-zustand';

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

export const {Provider, useStore} = createProvider<Store>()(
  (set) => ({
    count: 0,
    post: {
      id: 0,
      name: 'first',
      description: {
        title: "Test post",
        subtitle: 'about post'
      }
    },
    setPrevCount: () => {
      set((state) => ({count: state.count - 1}))
    },
    setNextCount: () => {
      set((state) => ({count: state.count + 1}))
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
  })
);
