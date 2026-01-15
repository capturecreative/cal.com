"use client";

import { useSession } from "next-auth/react";
import type { AriaRole, ComponentType } from "react";
import React, { Fragment, useEffect } from "react";

import { WEBAPP_URL } from "@calcom/lib/constants";
import { useLocale } from "@calcom/lib/hooks/useLocale";
import { Alert } from "@calcom/ui/components/alert";
import { Button } from "@calcom/ui/components/button";
import { EmptyScreen } from "@calcom/ui/components/empty-screen";

type LicenseRequiredProps = {
  as?: keyof JSX.IntrinsicElements | "";
  className?: string;
  role?: AriaRole | undefined;
  children: React.ReactNode;
};

const LicenseRequired = ({ children, as = "", ...rest }: LicenseRequiredProps) => {
  const session = useSession();
  const { t } = useLocale();
  const Component = as || Fragment;

  return (
    <Component {...rest}>
      {children}
    </Component>
  );
};

export const withLicenseRequired =
  <T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>) =>
  // eslint-disable-next-line react/display-name
  (hocProps: T) => (
    <div>
      <LicenseRequired>
        <Component {...hocProps} />
      </LicenseRequired>
    </div>
  );

export default LicenseRequired;
