import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navItems } from "../../data/navData";
import { subNavItems } from "../../data/subNavData";

const subNavKeyByPath = {
  "/company": "company",
  "/business": "business",
  "/solution": "solution",
  "/logistics-info": "logisticsInfo",
  "/support": "support",
  "/recruit": "recruit",
} as const;

function MainNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isDropdownClosing, setIsDropdownClosing] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname]);

  const closeDropdownAfterClick = (element: HTMLElement) => {
    setOpenDropdown(null);
    setIsDropdownClosing(true);
    element.blur();
  };

  return (
    <nav
      className={`main-nav${isDropdownClosing ? " is-dropdown-closing" : ""}`}
      aria-label="Main navigation"
    >
      <ul className="main-nav__list">
        {navItems.map((item) => {
          const subNavKey =
            subNavKeyByPath[item.path as keyof typeof subNavKeyByPath];
          const dropdownItems = subNavKey ? subNavItems[subNavKey] : [];
          const hasDropdown = dropdownItems.length > 0;
          const isOpen = openDropdown === item.path;

          const openCurrentDropdown = () => {
            if (hasDropdown && !isDropdownClosing) {
              setOpenDropdown(item.path);
            }
          };

          const closeCurrentDropdown = () => {
            if (hasDropdown) {
              setOpenDropdown(null);
            }

            setIsDropdownClosing(false);
          };

          return (
            <li
              key={item.path}
              className={`main-nav__item${isOpen ? " is-open" : ""}`}
              onMouseEnter={openCurrentDropdown}
              onMouseLeave={closeCurrentDropdown}
              onFocus={() => {
                setIsDropdownClosing(false);
                if (hasDropdown) {
                  setOpenDropdown(item.path);
                }
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  closeCurrentDropdown();
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  closeCurrentDropdown();

                  if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                  }
                }
              }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `main-nav__link${isActive ? " is-active" : ""}`
                }
                onClick={(event) => {
                  closeDropdownAfterClick(event.currentTarget);
                }}
                aria-expanded={hasDropdown ? isOpen : undefined}
              >
                <span>{item.label}</span>
                {hasDropdown && (
                  <img
                    className="main-nav__arrow"
                    src="/nav-arrow.svg"
                    alt=""
                    aria-hidden="true"
                  />
                )}
              </NavLink>
              {hasDropdown && (
                <ul className="main-nav__dropdown">
                  {dropdownItems.map((dropdownItem) => (
                    <li key={dropdownItem.id}>
                      <Link
                        className="main-nav__dropdown-link"
                        to={`${item.path}#${dropdownItem.id}`}
                        onClick={(event) => {
                          closeDropdownAfterClick(event.currentTarget);
                        }}
                      >
                        {dropdownItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default MainNav;
