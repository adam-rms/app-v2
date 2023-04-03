import { makeStyles } from "@rneui/themed";
import { ReactNode } from "react";
import { View } from "react-native";

export const Container = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const styles = useStyles();
  return <View style={styles.container}>{children}</View>;
};

export const Row = ({ children }: { children: ReactNode }): JSX.Element => {
  const styles = useStyles();
  return <View style={styles.row}>{children}</View>;
};

export const Column = ({ children }: { children: ReactNode }): JSX.Element => {
  const styles = useStyles();
  return <View style={styles.column}>{children}</View>;
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: theme.spacing.xl,
    padding: theme.spacing.lg,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.md,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.md,
  },
}));
