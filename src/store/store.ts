import { create } from "zustand";
import { AppModel, DefaultAppModel } from "./AppModel";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAppModel = create(
	persist(
		immer<AppModel>(() => ({
			...DefaultAppModel,
		})),
		{
			name: "default-storage", // unique name
			storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
		}
	)
);
