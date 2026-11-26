import { SiteFooter } from "../_components/site-footer";
import { SiteHeader } from "../_components/site-header";
import "./site.css";

// Shared shell for the public pages: /, /about, /pricing, /how-it-works, /contact.
// The (site) folder name is a route group, so it does not appear in the URL.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="site-root flex flex-1 flex-col overflow-x-clip bg-white font-sans text-(--ink) scheme-light selection:bg-(--accent) selection:text-white">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
