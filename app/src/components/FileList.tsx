import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import { s3url, fileExtensionToIcon, formatSize } from "../utilities/Files";

interface FileListProps {
  files: IFile[];
  cardTitle?: string;
}

const FileList: React.FC<FileListProps> = ({ files, cardTitle }) => {
  if (!files || files.length === 0) return null;
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{cardTitle ? cardTitle : "Files"}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonList>
          {files.map((item: IFile) => {
            return (
              <IonItem
                key={item.s3files_id}
                button
                onClick={async () => {
                  window.open(
                    await s3url(item.s3files_id, item.s3files_meta_size),
                    "_system",
                  );
                }}
              >
                <IonLabel slot="start" className="flex-02">
                  <FontAwesomeIcon
                    icon={fileExtensionToIcon(item.s3files_extension)}
                  />
                </IonLabel>
                <IonLabel>
                  <h2>{item.s3files_name}</h2>
                </IonLabel>
                <IonLabel slot="end">
                  {formatSize(item.s3files_meta_size)}
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default FileList;
