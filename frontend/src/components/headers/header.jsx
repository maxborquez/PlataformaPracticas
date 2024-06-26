import { Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import logoubb from "../../assets/logoubb.png";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, isWideScreen, showSidebarButton }) => {
  return (
    <Grid container sx={{ zIndex: 10 }}>
      <Grid
        item
        sx={{
          width: "100%",
          display: "flex",
          backgroundColor: "#326FA6",
          height: "80px",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
        }}
      >
        {showSidebarButton && !isWideScreen && (
          <IconButton
            onClick={toggleSidebar}
            color="inherit"
            sx={{ backgroundColor: "white", borderRadius: 0, padding: 1 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <img
          style={{
            display: showSidebarButton && !isWideScreen ? "block" : "inline-block",
            marginLeft: showSidebarButton && !isWideScreen ? "auto" : "50px",
            marginRight: showSidebarButton && !isWideScreen ? "auto" : "0",
            width: "130px",
          }}
          src={logoubb}
          alt="Logo"
        />
      </Grid>
    </Grid>
  );
};

export default Header;
