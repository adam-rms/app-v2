import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import PageTitle from "./PageTitle";

type Props = {
  title?: any;
  children?: any;
  show_header?: boolean;
};

function Page({ title, children, show_header = true }: Props) {
  return (
    <>
      <PageTitle title={title} />
      <IonPage>
        {show_header && (
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuButton />
                <IonBackButton />
              </IonButtons>
              <IonTitle>{title}</IonTitle>
            </IonToolbar>
          </IonHeader>
        )}
        <IonContent fullscreen>
          {show_header && (
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">{title}</IonTitle>
              </IonToolbar>
            </IonHeader>
          )}
          {children}
        </IonContent>
      </IonPage>
    </>
  );
}

export default Page;
