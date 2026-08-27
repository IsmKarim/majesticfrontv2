export interface NavItem {
  title: string;
  href: string;
  description?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface NavigationConfig {
  mainNav: NavItemWithChildren[];
  sidebarNav?: NavItemWithChildren[];
  footerNav?: {
    company: NavItem[];
    properties: NavItem[];
    resources: NavItem[];
    legal: NavItem[];
  };
}

export const navigationConfig: NavigationConfig = {
  mainNav: [
    {
      // `title` and `description` are i18n keys resolved against the `nav`
      // namespace at render time, not display strings.
      title: "home",
      href: "/",
    },
    {
      title: "properties",
      href: "/properties",
      items: [
        {
          title: "buy",
          href: "/properties?transactionType=sale",
          description: "buyDescription",
        },
        {
          title: "rent",
          href: "/properties?transactionType=rent",
          description: "rentDescription",
        },
      ],
    },
    {
      title: "about",
      href: "/about",
    },
    {
      title: "services",
      href: "/services",
    },
    {
      title: "contact",
      href: "/contact",
      label: "cta",
    },
  ],
};

export const getAllRoutes = (): string[] => {
  const routes: string[] = [];
  
  const extractRoutes = (items: NavItemWithChildren[]) => {
    items.forEach((item) => {
      if (item.href) routes.push(item.href);
      if (item.items) extractRoutes(item.items);
    });
  };

  extractRoutes(navigationConfig.mainNav);
  if (navigationConfig.sidebarNav) extractRoutes(navigationConfig.sidebarNav);

  if (navigationConfig.footerNav) {
    Object.values(navigationConfig.footerNav).forEach((section) => {
      section.forEach((item) => routes.push(item.href));
    });
  }

  return [...new Set(routes)]; 
};

export const isActiveRoute = (pathname: string, href: string): boolean => {
  // Nav hrefs may carry a query (e.g. /properties?transactionType=sale); active
  // state is decided on the path alone.
  const path = href.split("?")[0];
  if (path === "/") return pathname === "/";
  return pathname.startsWith(path);
};