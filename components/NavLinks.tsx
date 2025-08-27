import { Button } from "@mui/material";
import Link from "next/link";

type NavLinksProps = {
  userName: string;
  onLogoutClick: () => void;
};

function NavLinks({ userName, onLogoutClick }: NavLinksProps) {
  return (
    <>
      <Button color="inherit" component={Link} href="/" sx={{ color: "black" }}>
        Home
      </Button>
      {!userName ? (
        <>
          <Button
            color="inherit"
            component={Link}
            href="/register"
            sx={{ color: "black" }}
          >
            Register
          </Button>
          <Button
            color="inherit"
            component={Link}
            href="/login"
            sx={{ color: "black" }}
          >
            Login
          </Button>
        </>
      ) : (
        <Button color="inherit" onClick={onLogoutClick}>
          Logout
        </Button>
      )}
    </>
  );
}

export default NavLinks;
