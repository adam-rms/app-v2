import { ScrollView } from "native-base";
import { ReactElement, JSXElementConstructor } from "react";
import { StyleSheet, RefreshControlProps } from "react-native";

interface ScrollViewProps {
  children: React.ReactNode;
  refreshControl?: ReactElement<
    RefreshControlProps,
    string | JSXElementConstructor<any>
  >;
}

const styles = StyleSheet.create({
  fullHeight: {
    height: "100%",
    width: "100%",
  },
});

const ScrollContainer = (props: ScrollViewProps) => {
  return (
    <ScrollView style={styles.fullHeight} refreshControl={props.refreshControl}>
      {props.children}
    </ScrollView>
  );
};

export default ScrollContainer;
