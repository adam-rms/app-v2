import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
} from "@ionic/react";
import { useContext, useEffect } from "react";
import Page from "../../components/Page";
import { ProjectDataContext } from "../../contexts/project/ProjectDataContext";
import { useParams } from "react-router";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import Api from "../../utilities/Api";

interface IFormInput {
  projectsVacantRolesApplications_phone: string;
  projectsVacantRolesApplications_questionAnswers: {
    name: string;
    type: string;
    placeholder: string;
    value: string;
  }[];
  projectsVacantRolesApplications_applicantComment: string;
}

const ProjectCrewApplication = () => {
  const { projectCrewRoles } = useContext(ProjectDataContext);
  const { roleId } = useParams<{ roleId: string }>();

  //react-hook-form
  const { register, handleSubmit, control } = useForm<IFormInput>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projectsVacantRolesApplications_questionAnswers",
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const questions: { name: string; value: string }[] = [];
    data.projectsVacantRolesApplications_questionAnswers.map(
      (question: any) => {
        questions.push({
          name: question.name,
          value: question.value,
        });
      },
    );

    const formData = [
      {
        name: "projectsVacantRoles_id",
        value: roleId,
      },
      {
        name: "projectsVacantRolesApplications_phone",
        value: data.projectsVacantRolesApplications_phone,
      },
      {
        name: "projectsVacantRolesApplications_applicantComment",
        value: data.projectsVacantRolesApplications_applicantComment,
      },
      {
        name: "projectsVacantRolesApplications_questionAnswers",
        value: JSON.stringify(questions),
      },
    ];

    Api("projects/crew/crewRoles/apply.php", { formData }).then((res) => {
      console.log(res);
    });
  };

  //filter by requested crew role
  const thisRole: IProjectCrewRole = projectCrewRoles.find(
    (element: IProjectCrewRole) =>
      element.projectsVacantRoles_id == parseInt(roleId),
  );

  if (thisRole) {
    //information to display
    const information = [
      {
        title: "Project",
        value: thisRole.projects_name,
      },
      {
        title: "Project Manager",
        value:
          thisRole.users_name1 +
          " " +
          thisRole.users_name2 +
          " (" +
          thisRole.users_email +
          ")",
      },
      {
        title: "Project Starts",
        value: thisRole.projects_dates_deliver_start,
      },
      {
        title: "Project Ends",
        value: thisRole.projects_dates_deliver_end,
      },
      {
        title: "Role",
        value: thisRole.projectsVacantRoles_name,
      },
      {
        title: "Role Deadline",
        value: thisRole.projectsVacantRoles_deadline,
      },
      {
        title: "Places Available",
        value: thisRole.projectsVacantRoles_slots,
      },
      {
        title: "Places Filled",
        value: thisRole.projectsVacantRoles_slotsFilled,
      },
    ];

    //populate form with additional questions for application
    useEffect(() => {
      remove();
      thisRole.projectsVacantRoles_questions.map(
        (question: IProjectCrewRoleQuestion) => {
          append({
            name: question.name,
            type: question.type,
            placeholder: question.placeholder,
            value: "",
          });
        },
      );
    }, []);

    return (
      <Page
        title={
          `Crew Vacancy: ` +
          thisRole.projects_name +
          ` - ` +
          thisRole.projectsVacantRoles_name
        }
      >
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Role Information</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {information.map((item, index) => {
                if (item.value || item.value === 0) {
                  return (
                    <IonItem key={index}>
                      <IonTitle>{item.title}</IonTitle>
                      <IonText>{item.value}</IonText>
                    </IonItem>
                  );
                } else {
                  return null;
                }
              })}
            </IonList>
            <IonGrid>
              <IonRow>
                <IonItem>
                  <IonTitle color="primary">Description</IonTitle>
                  <p>{thisRole.projectsVacantRoles_description}</p>
                </IonItem>
                <IonItem>
                  <IonTitle color="primary">Person Specification</IonTitle>
                  <p>{thisRole.projectsVacantRoles_personSpecification}</p>
                </IonItem>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        {thisRole.application == null && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Apply</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                {thisRole.projectsVacantRoles_collectPhone == 1 && (
                  <IonItem>
                    <IonLabel>Phone Number</IonLabel>
                    <IonInput
                      type="tel"
                      {...register("projectsVacantRolesApplications_phone")}
                    />
                  </IonItem>
                )}
                {fields.map((field, index) => {
                  return (
                    <IonItem key={field.id}>
                      <IonLabel>{field.name}</IonLabel>
                      {field.type == "textarea" ? (
                        <IonTextarea
                          placeholder={field.placeholder}
                          autoGrow={true}
                          {...register(
                            `projectsVacantRolesApplications_questionAnswers.${index}.value` as const,
                          )}
                        />
                      ) : (
                        <IonInput
                          type={field.type as any}
                          placeholder={field.placeholder}
                          {...register(
                            `projectsVacantRolesApplications_questionAnswers.${index}.value` as const,
                          )}
                        />
                      )}
                    </IonItem>
                  );
                })}
                <IonItem>
                  <IonLabel>Comments</IonLabel>
                  <IonTextarea
                    placeholder="Anything you'd like to add?"
                    autoGrow={true}
                    {...register(
                      "projectsVacantRolesApplications_applicantComment",
                    )}
                  />
                </IonItem>
                <IonButton type="submit">Submit Application</IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        )}
      </Page>
    );
  } else {
    return null;
  }
};

export default ProjectCrewApplication;
