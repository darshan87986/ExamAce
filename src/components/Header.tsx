import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const navLinks = [
	{ to: "/", label: "Home" },
	{ to: "/universities", label: "Universities" },
	{ to: "/about", label: "About Us" },
	{ to: "/contact", label: "Contact Us" },
];

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="border-b bg-card">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<GraduationCap className="h-8 w-8 text-primary" />
						<h1 className="text-2xl font-bold text-foreground">EduMasters</h1>
					</div>
					{/* Desktop Nav */}
					<nav className="hidden md:flex space-x-6">
						{navLinks.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className="text-muted-foreground hover:text-primary transition-colors font-medium"
							>
								{link.label}
							</Link>
						))}
					</nav>
					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<Button
							variant="outline"
							size="icon"
							aria-label={isMenuOpen ? "Close menu" : "Open menu"}
							onClick={() => setIsMenuOpen((open) => !open)}
							className="bg-white border border-gray-300 shadow text-primary"
						>
							{isMenuOpen ? (
								<X className="w-6 h-6 text-primary" />
							) : (
								<Menu className="w-6 h-6 text-primary" />
							)}
						</Button>
					</div>
				</div>
			</div>
			{/* Mobile Nav Drawer */}
			{isMenuOpen && (
				<nav className="md:hidden fixed top-0 left-0 w-full h-full bg-background bg-opacity-95 z-50 flex flex-col items-center justify-center">
					<Button
						variant="ghost"
						size="icon"
						className="absolute top-4 right-4"
						aria-label="Close menu"
						onClick={() => setIsMenuOpen(false)}
					>
						<X className="w-6 h-6" />
					</Button>
					<div className="flex flex-col space-y-8 text-xl font-semibold">
						{navLinks.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className="text-muted-foreground hover:text-primary transition-colors"
								onClick={() => setIsMenuOpen(false)}
							>
								{link.label}
							</Link>
						))}
					</div>
				</nav>
			)}
		</header>
	);
};

export default Header;
