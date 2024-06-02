import {FC, ReactNode} from "react";

export const Container: FC<{ children: ReactNode }> = (
  {children}
) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grow">
      {children}
    </div>
  )
}