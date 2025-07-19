"use client";

import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../icon.png";
import { Search, SearchIconWrapper, StyledInputBase } from "./StyledComponents";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Collapse from "@mui/material/Collapse"; // For collapsing menu items
import ExpandLess from "@mui/icons-material/ExpandLess"; // For collapsing menu items
import ExpandMore from "@mui/icons-material/ExpandMore"; // For collapsing menu items
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const pages = ["home", "movies", "food&drinks"];
const settings = ["Profile", "Purchases", "Manage payments", "Logout"];
const unLoggedInSettings = ["Login", "Signup"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [moviesMenuAnchor, setMoviesMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMoviesOpen, setMobileMoviesOpen] = useState(false);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMoviesMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMoviesMenuAnchor(event.currentTarget);
  };
  const handleMoviesMenuClose = () => {
    setMoviesMenuAnchor(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleMobileMoviesToggle = () => {
    setMobileMoviesOpen((prev) => !prev);
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split("@")[0][0]}${name.split("@")[0][1]}`,
    };
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#6b21a8",
        color: "#fff",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 1, sm: 2 },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          {/* Left Section: Logo and Title */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Image
              src={logo}
              alt="seat stream"
              height={40}
              width={40}
              quality={100}
              style={{
                marginRight: 10,
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                display: { xs: "none", sm: "block" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              SEAT STREAM
            </Typography>
          </Box>

          {/* Center Section: Desktop Navigation */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
              minWidth: 0,
            }}
          >
            {pages.map((page, index) =>
              page === "movies" ? (
                <React.Fragment key={index}>
                  <Button
                    onClick={handleMoviesMenuOpen}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      mx: 1,
                      fontWeight: 700,
                    }}
                  >
                    MOVIES
                  </Button>
                  <Menu
                    anchorEl={moviesMenuAnchor}
                    open={Boolean(moviesMenuAnchor)}
                    onClose={handleMoviesMenuClose}
                    MenuListProps={{
                      sx: { background: "#2d2d2d", color: "white" },
                    }}
                  >
                    <MenuItem
                      onClick={handleMoviesMenuClose}
                      component="a"
                      href="/movies/whats-on"
                    >
                      What&apos;s On
                    </MenuItem>
                    <MenuItem
                      onClick={handleMoviesMenuClose}
                      component="a"
                      href="/movies/coming-soon"
                    >
                      Coming Soon
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              ) : (
                <Button
                  key={page}
                  href={`/${page === "home" ? "" : page}`}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    mx: 1,
                    fontWeight: 700,
                  }}
                >
                  {page.toUpperCase()}
                </Button>
              ),
            )}
          </Box>

          {/* Right Section: Hamburger (mobile), Desktop Search, and Avatar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
              flexShrink: 0,
            }}
          >
            {/* Desktop Search Bar (only visible on md and up) */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Search
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const value = formData.get("search") as string;
                  console.log(value);
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search Movie…"
                  name="search"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar {...stringAvatar("Andrewemail343@gmail.com")} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>

            {/* Hamburger menu for mobile (only visible on xs, sm) */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="open navigation menu"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Mobile Drawer */}
          <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
            <Box
              sx={{
                width: 250,
                backgroundColor: "#1a1a2e",
                color: "#FFF",
                height: "100%",
              }}
              role="presentation"
            >
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Image
                  src={logo}
                  alt="seat stream"
                  height={40}
                  width={40}
                  quality={100}
                  style={{
                    marginRight: 10,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    color: "inherit",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  SEAT STREAM
                </Typography>
              </Box>
              <List>
                {/* Search bar moved inside the drawer for mobile */}
                <Box sx={{ p: 2, display: { xs: "block", md: "none" } }}>
                  <Search
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const value = formData.get("search") as string;
                      console.log(value);
                      handleDrawerToggle(); // Close drawer after search
                    }}
                  >
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search Movie…"
                      name="search"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
                </Box>

                {/* Navigation items */}
                {pages.map((page) =>
                  page === "movies" ? (
                    <React.Fragment key={page}>
                      <ListItemButton onClick={handleMobileMoviesToggle}>
                        <ListItemText
                          primary="MOVIES"
                          sx={{ fontWeight: 700 }}
                        />
                        {mobileMoviesOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse
                        in={mobileMoviesOpen}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          <MenuItem
                            onClick={handleDrawerToggle}
                            component="a"
                            href="/movies/whats-on"
                            sx={{ pl: 4 }}
                          >
                            What&apos;s On
                          </MenuItem>
                          <MenuItem
                            onClick={handleDrawerToggle}
                            component="a"
                            href="/movies/coming-soon"
                            sx={{ pl: 4 }}
                          >
                            Coming Soon
                          </MenuItem>
                        </List>
                      </Collapse>
                    </React.Fragment>
                  ) : (
                    <MenuItem
                      key={page}
                      onClick={handleDrawerToggle}
                      component="a"
                      href={`/${page === "home" ? "" : page}`}
                    >
                      {page.toUpperCase()}
                    </MenuItem>
                  ),
                )}
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
