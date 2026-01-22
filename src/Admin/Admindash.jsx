import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Adminnav } from "./Adminnav";
import { Italic } from "lucide-react";

export const Admindash = () => {
  // Dummy static data (can be replaced later with API/objects)
  const stats = [
    { title: "Total Sales", value: "$12,450", icon: <AttachMoneyIcon sx={{ fontSize: 40, color: "green" }} /> },
    { title: "Total Orders", value: "320", icon: <ShoppingCartIcon sx={{ fontSize: 40, color: "blue" }} /> },
    { title: "Pending Orders", value: "18", icon: <PendingActionsIcon sx={{ fontSize: 40, color: "orange" }} /> },
    { title: "Catalogue Items", value: "145", icon: <InventoryIcon sx={{ fontSize: 40, color: "purple" }} /> },
  ];

  return (
    <>
     
      <Box sx={{ p: 4, bgcolor: "#f4f6f8", minHeight: "100vh" }}>
        <Typography className="italic font-bold fade-in-up " variant="h4"  gutterBottom>
          Admin Dashboard
        </Typography>

        <br />

        {/* Flex container for cards */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}
        className="fade-in-up">
          {stats.map((stat, index) => (
            <Card
              key={index}
              sx={{
                flex: "1 1 240px", // responsive sizing
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                {/* Icon */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                  {stat.icon}
                </Box>

                {/* Title */}
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {stat.title}
                </Typography>

                {/* Value */}
                <Typography variant="h4" color="primary">
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};
