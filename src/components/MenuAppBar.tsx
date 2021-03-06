import * as React from "react";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { withStyles, WithStyles } from "@material-ui/core/styles";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Refresh from "@material-ui/icons/Refresh";

interface IMenuAppBarProps {
  auth: boolean;
  handleLogout?: () => void;
  handleRefresh?: () => void;
}

interface IMenuAppBarStates {
  anchorEl?: object;
}

const styles = {
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  typo: {
    flex: 1,
    textAlign: "left" as "left"
  }
};

type CombinedIMenuAppBarProps = IMenuAppBarProps &
  WithStyles<keyof typeof styles>;

class MenuAppBar extends React.Component<
  CombinedIMenuAppBarProps,
  IMenuAppBarStates
> {
  public state = {
    anchorEl: undefined
  };

  public render() {
    const { classes, auth } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.typo}>
            서울시립대학교 학점 확인
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleRefresh}
                color="inherit"
              >
                <Refresh />
              </IconButton>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  horizontal: "right",
                  vertical: "top"
                }}
                transformOrigin={{
                  horizontal: "right",
                  vertical: "top"
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleLogout}>로그아웃</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }

  private handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleClose = () => {
    this.setState({ anchorEl: undefined });
  };

  private handleRefresh = () => {
    if (this.props.handleRefresh) {
      this.props.handleRefresh();
    }
  };

  private handleLogout = () => {
    if (this.props.handleLogout) {
      this.props.handleLogout();
    }
    this.setState({ anchorEl: undefined });
  };
}

export default withStyles(styles)(MenuAppBar);
