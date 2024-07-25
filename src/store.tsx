import { create } from "zustand";

export interface Option {
  value: string;
  label: string;
  disable?: boolean;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
}

type OmStore = {
  workflows: any;
  setWorkflows: (worflow: any) => void;
};

export const useOmStore = create<OmStore>()((set) => ({
  workflows: {},
  setWorkflows: (workflows: any) => set({ workflows }),
}));
