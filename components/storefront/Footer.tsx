const Footer = () => {
  return (
    <footer className="bg-white h-20 relative mt-16">
      <div className="h-full mx-auto w-full px-2.5 md:px-20">
        <div className="border-t border-gray-200" />
        <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
          <div className="text-center md:text-left pb-2 md:pb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
