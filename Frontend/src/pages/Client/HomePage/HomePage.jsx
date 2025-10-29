import Box from "@mui/material/Box";
import AppBarComponent from "../../../components/AppBar/AppBarComponent";

const HomePage = () => {
  return (
    <>
      <AppBarComponent></AppBarComponent>
      <Box>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            backgroundColor: "primary.main",
          }}
        ></Box>
        <Box></Box>
      </Box>
    </>
  );
};

export default HomePage;
