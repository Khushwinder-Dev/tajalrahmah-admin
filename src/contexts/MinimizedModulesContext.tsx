// contexts/MinimizedModulesContext.tsx
import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import {
  type MinimizedModulesState,
  type MinimizedModulesAction,
} from "@/types/modules";

interface MinimizedModulesContextType {
  state: MinimizedModulesState;
  dispatch: React.Dispatch<MinimizedModulesAction>;
}

const MinimizedModulesContext = createContext<
  MinimizedModulesContextType | undefined
>(undefined);

const initialState: MinimizedModulesState = {
  minimizedModules: [],
  activeModule: null,
};

function minimizedModulesReducer(
  state: MinimizedModulesState,
  action: MinimizedModulesAction
): MinimizedModulesState {
  switch (action.type) {
    case "MINIMIZE_MODULE":
      return {
        ...state,
        minimizedModules: [
          ...state.minimizedModules,
          {
            ...action.payload,
            minimizedAt: new Date().toISOString(),
          },
        ],
      };

    case "RESTORE_MODULE":
      return {
        ...state,
        minimizedModules: state.minimizedModules.filter(
          (module) => module.id !== action.payload.id
        ),
        activeModule: action.payload.id,
      };

    case "CLOSE_MINIMIZED":
      return {
        ...state,
        minimizedModules: state.minimizedModules.filter(
          (module) => module.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
}

interface MinimizedModulesProviderProps {
  children: ReactNode;
}

export const MinimizedModulesProvider: React.FC<
  MinimizedModulesProviderProps
> = ({ children }) => {
  const [state, dispatch] = useReducer(minimizedModulesReducer, initialState);

  return (
    <MinimizedModulesContext.Provider value={{ state, dispatch }}>
      {children}
    </MinimizedModulesContext.Provider>
  );
};

export const useMinimizedModules = (): MinimizedModulesContextType => {
  const context = useContext(MinimizedModulesContext);
  if (!context) {
    throw new Error(
      "useMinimizedModules must be used within MinimizedModulesProvider"
    );
  }
  return context;
};
