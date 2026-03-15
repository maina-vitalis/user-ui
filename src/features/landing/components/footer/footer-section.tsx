import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { platformName, socialLinks } from "../../constants";

export function FooterSection() {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight">{platformName}</span>
              <Badge variant="secondary">Beta</Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              The premium multivendor commerce platform for modern sellers and smart shoppers.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Tooltip key={social.label}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={social.label}
                        className="rounded-full border border-border"
                      >
                        <Icon className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{social.label}</TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Platform</h3>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <a href="#about" className="block transition-all duration-300 hover:text-foreground">
                About
              </a>
              <a href="#" className="block transition-all duration-300 hover:text-foreground">
                Careers
              </a>
              <a href="#" className="block transition-all duration-300 hover:text-foreground">
                Blog
              </a>
              <a href="#" className="block transition-all duration-300 hover:text-foreground">
                Press
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Support</h3>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <a href="#" className="block transition-all duration-300 hover:text-foreground">
                Help Center
              </a>
              <a href="#" className="block transition-all duration-300 hover:text-foreground">
                Contact
              </a>
              <a href="#" className="block transition-all duration-300 hover:text-foreground">
                Terms
              </a>
              <a href="#" className="block transition-all duration-300 hover:text-foreground">
                Privacy
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Vendors</h3>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
              <a href="#vendors" className="block transition-all duration-300 hover:text-foreground">
                Become a Seller
              </a>
              <a href="#" className="block transition-all duration-300 hover:text-foreground">
                Vendor Docs
              </a>
              <a href="#pricing" className="block transition-all duration-300 hover:text-foreground">
                Commission Rates
              </a>
              <a href="#" className="block transition-all duration-300 hover:text-foreground">
                Seller Stories
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />
        <p className="text-center text-sm text-muted-foreground">
          {new Date().getFullYear()} {platformName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}