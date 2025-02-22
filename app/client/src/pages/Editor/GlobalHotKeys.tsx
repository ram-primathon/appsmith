import React from "react";
import { connect } from "react-redux";
import { AppState } from "reducers";
import { Hotkey, Hotkeys } from "@blueprintjs/core";
import { HotkeysTarget } from "@blueprintjs/core/lib/esnext/components/hotkeys/hotkeysTarget.js";
import {
  closePropertyPane,
  copyWidget,
  cutWidget,
  deleteSelectedWidget,
  pasteWidget,
  selectAllWidgetsInit,
  selectAllWidgets,
} from "actions/widgetActions";
import { toggleShowGlobalSearchModal } from "actions/globalSearchActions";
import { isMac } from "utils/helpers";
import { getSelectedWidget, getSelectedWidgets } from "selectors/ui";
import { MAIN_CONTAINER_WIDGET_ID } from "constants/WidgetConstants";
import { getSelectedText } from "utils/helpers";
import AnalyticsUtil from "utils/AnalyticsUtil";
import {
  ENTITY_EXPLORER_SEARCH_ID,
  WIDGETS_SEARCH_ID,
} from "constants/Explorer";
import { setCommentMode as setCommentModeAction } from "actions/commentActions";
import { showDebugger } from "actions/debuggerActions";

type Props = {
  copySelectedWidget: () => void;
  pasteCopiedWidget: () => void;
  deleteSelectedWidget: () => void;
  cutSelectedWidget: () => void;
  toggleShowGlobalSearchModal: () => void;
  resetCommentMode: () => void;
  openDebugger: () => void;
  closeProppane: () => void;
  selectAllWidgetsInit: () => void;
  deselectAllWidgets: () => void;
  selectedWidget?: string;
  selectedWidgets: string[];
  isDebuggerOpen: boolean;
  children: React.ReactNode;
};

@HotkeysTarget
class GlobalHotKeys extends React.Component<Props> {
  public stopPropagationIfWidgetSelected(e: KeyboardEvent): boolean {
    const multipleWidgetsSelected =
      this.props.selectedWidgets && this.props.selectedWidgets.length;
    const singleWidgetSelected =
      this.props.selectedWidget &&
      this.props.selectedWidget != MAIN_CONTAINER_WIDGET_ID;
    if (
      (singleWidgetSelected || multipleWidgetsSelected) &&
      !getSelectedText()
    ) {
      e.preventDefault();
      e.stopPropagation();
      return true;
    }
    return false;
  }

  public areMultipleWidgetsSelected() {
    const multipleWidgetsSelected =
      this.props.selectedWidgets && this.props.selectedWidgets.length >= 2;
    return !!multipleWidgetsSelected;
  }

  public renderHotkeys() {
    return (
      <Hotkeys>
        <Hotkey
          combo="mod + f"
          global
          label="Search entities"
          onKeyDown={(e: any) => {
            const entitySearchInput = document.getElementById(
              ENTITY_EXPLORER_SEARCH_ID,
            );
            const widgetSearchInput = document.getElementById(
              WIDGETS_SEARCH_ID,
            );
            if (entitySearchInput) entitySearchInput.focus();
            if (widgetSearchInput) widgetSearchInput.focus();
            e.preventDefault();
            e.stopPropagation();
          }}
        />
        <Hotkey
          allowInInput={false}
          combo="mod + k"
          global
          label="Show omnibar"
          onKeyDown={(e: KeyboardEvent) => {
            console.log("toggleShowGlobalSearchModal");
            e.preventDefault();
            this.props.toggleShowGlobalSearchModal();
            AnalyticsUtil.logEvent("OPEN_OMNIBAR", { source: "HOTKEY_COMBO" });
          }}
        />
        <Hotkey
          combo="mod + d"
          global
          group="Canvas"
          label="Open Debugger"
          onKeyDown={() => {
            this.props.openDebugger();
            if (this.props.isDebuggerOpen) {
              AnalyticsUtil.logEvent("OPEN_DEBUGGER", {
                source: "CANVAS",
              });
            }
          }}
          preventDefault
        />
        <Hotkey
          combo="mod + c"
          global
          group="Canvas"
          label="Copy Widget"
          onKeyDown={(e: any) => {
            if (
              this.stopPropagationIfWidgetSelected(e) &&
              !this.areMultipleWidgetsSelected()
            ) {
              this.props.copySelectedWidget();
            }
          }}
        />
        <Hotkey
          combo="mod + v"
          global
          group="Canvas"
          label="Paste Widget"
          onKeyDown={() => {
            this.props.pasteCopiedWidget();
          }}
        />
        <Hotkey
          combo="backspace"
          global
          group="Canvas"
          label="Delete Widget"
          onKeyDown={(e: any) => {
            if (this.stopPropagationIfWidgetSelected(e) && isMac()) {
              this.props.deleteSelectedWidget();
            }
          }}
        />
        <Hotkey
          combo="del"
          global
          group="Canvas"
          label="Delete Widget"
          onKeyDown={(e: any) => {
            if (this.stopPropagationIfWidgetSelected(e)) {
              this.props.deleteSelectedWidget();
            }
          }}
        />
        <Hotkey
          combo="mod + x"
          global
          group="Canvas"
          label="Cut Widget"
          onKeyDown={(e: any) => {
            if (
              this.stopPropagationIfWidgetSelected(e) &&
              !this.areMultipleWidgetsSelected()
            ) {
              this.props.cutSelectedWidget();
            }
          }}
        />
        <Hotkey
          combo="mod + a"
          global
          group="Canvas"
          label="Select all Widget"
          onKeyDown={(e: any) => {
            this.props.selectAllWidgetsInit();
            e.preventDefault();
          }}
        />
        <Hotkey
          combo="esc"
          global
          group="Canvas"
          label="Deselect all Widget"
          onKeyDown={(e: any) => {
            this.props.resetCommentMode();
            this.props.deselectAllWidgets();
            this.props.closeProppane();
            e.preventDefault();
          }}
        />
      </Hotkeys>
    );
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = (state: AppState) => ({
  selectedWidget: getSelectedWidget(state),
  selectedWidgets: getSelectedWidgets(state),
  isDebuggerOpen: state.ui.debugger.isOpen,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    copySelectedWidget: () => dispatch(copyWidget(true)),
    pasteCopiedWidget: () => dispatch(pasteWidget()),
    deleteSelectedWidget: () => dispatch(deleteSelectedWidget(true)),
    cutSelectedWidget: () => dispatch(cutWidget()),
    toggleShowGlobalSearchModal: () => dispatch(toggleShowGlobalSearchModal()),
    resetCommentMode: () => dispatch(setCommentModeAction(false)),
    openDebugger: () => dispatch(showDebugger()),
    closeProppane: () => dispatch(closePropertyPane()),
    selectAllWidgetsInit: () => dispatch(selectAllWidgetsInit()),
    deselectAllWidgets: () => dispatch(selectAllWidgets([])),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHotKeys);
