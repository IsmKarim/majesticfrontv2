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
      title: "Home",
      href: "/",
    },
    {
      title: "Properties",
      href: "/properties",
      items: [
        {
          title: "Buy",
          href: "/properties/buy",
          description: "Browse properties for sale",
        },
        {
          title: "Rent",
          href: "/properties/rent",
          description: "Find rental properties",
        },
    
      ],
    },
    {
      title: "About Us",
      href: "/about",
    },
   
    {
      title: "Services",
      href: "/services",
     
    },
    {
      title: "Contact",
      href: "/contact",
      label: "cta",
    },

    {
      title: "Contact",
      href: "/contact",
      label: "cta",
    },
  ],

  
 /*  footerNav: {
    company: [
      {
        title: "About Us",
        href: "/about",
      },
      {
        title: "Our Team",
        href: "/about/team",
      },
      {
        title: "Careers",
        href: "/about/careers",
      },
      {
        title: "Press",
        href: "/press",
      },
      {
        title: "Contact",
        href: "/contact",
      },
    ],
    properties: [
      {
        title: "Buy Properties",
        href: "/properties/buy",
      },
      {
        title: "Rent Properties",
        href: "/properties/rent",
      },
      {
        title: "Luxury Estates",
        href: "/properties/luxury",
      },
      {
        title: "Commercial",
        href: "/properties/commercial",
      },
      {
        title: "New Developments",
        href: "/properties/new-developments",
      },
    ],
    resources: [
      {
        title: "Blog",
        href: "/blog",
      },
      {
        title: "Market Reports",
        href: "/resources/reports",
      },
      {
        title: "Buying Guide",
        href: "/resources/buying-guide",
      },
      {
        title: "Selling Guide",
        href: "/resources/selling-guide",
      },
      {
        title: "FAQs",
        href: "/faqs",
      },
    ],
    legal: [
      {
        title: "Privacy Policy",
        href: "/privacy",
      },
      {
        title: "Terms of Service",
        href: "/terms",
      },
      {
        title: "Cookie Policy",
        href: "/cookies",
      },
      {
        title: "Accessibility",
        href: "/accessibility",
      },
    ],
  }, */
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
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
};