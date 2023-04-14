import { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { DrawerScreenProps } from "@react-navigation/drawer";
import Api from "../../utilities/Api";
import { RMSDrawerParamList } from "../../utilities/Routing";
import useProjectData from "../../contexts/useProjectData";
import {
  Box,
  Container,
  Divider,
  Heading,
  Input,
  ScrollView,
  Text,
  useToast,
  TextArea,
  Button,
} from "native-base";
import Card from "../../components/Card";
import { RefreshControl } from "react-native";

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

const CrewRecruitmentApplication = ({
  route,
  navigation,
}: DrawerScreenProps<RMSDrawerParamList, "CrewRecruitmentApplication">) => {
  const { applicationId } = route.params;
  const { projectCrewRoles, refreshProjectCrewRoles } = useProjectData();
  const toast = useToast();
  const [applied, setApplied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const doRefresh = async () => {
    setLoading(true);
    await refreshProjectCrewRoles();
    setLoading(false);
  };

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

    const formData = new FormData();
    formData.append(
      "formData[0][name]",
      "projectsVacantRolesApplications_phone",
    );
    formData.append(
      "formData[0][value]",
      data.projectsVacantRolesApplications_phone,
    );
    formData.append(
      "formData[1][name]",
      "projectsVacantRolesApplications_applicantComment",
    );
    formData.append(
      "formData[1][value]",
      data.projectsVacantRolesApplications_applicantComment,
    );
    formData.append(
      "formData[2][name]",
      "projectsVacantRolesApplications_questionAnswers",
    );
    formData.append("formData[2][value]", JSON.stringify(questions));
    formData.append("formData[3][name]", "projectsVacantRoles_id");
    formData.append("formData[3][value]", applicationId.toString());

    Api("projects/crew/crewRoles/apply.php", formData).then((res) => {
      if (res && res.result == false) {
        if (res.error?.message) {
          toast.show({
            description: "Error: " + res.error.message,
          });
        } else {
          toast.show({
            description: "Something went wrong. Please try again later.",
          });
        }
      } else {
        toast.show({
          description: "Application submitted successfully.",
        });
        setApplied(true);
      }
    });
  };

  //filter by requested crew role
  const thisRole = projectCrewRoles.find(
    (element: IProjectCrewRole) =>
      element.projectsVacantRoles_id == applicationId,
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
      setApplied(!(thisRole.application == null));
    }, []);

    return (
      <Container>
        <ScrollView
          h="100%"
          refreshControl={
            <RefreshControl
              onRefresh={() => doRefresh()}
              refreshing={loading}
            />
          }
        >
          <Card>
            <Heading>
              {thisRole.projects_name +
                ` - ` +
                thisRole.projectsVacantRoles_name}
            </Heading>
          </Card>
          <Card>
            <Heading>Role Information</Heading>
            <Divider />
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="6">
                  {information.map((item, index) => {
                    if (item.value || item.value === 0) {
                      return (
                        <IonCol className="container" key={index} size="12">
                          <IonText color="medium">
                            <h2>{item.title}</h2>
                          </IonText>
                          <IonText>{item.value}</IonText>
                        </IonCol>
                      );
                    } else {
                      return null;
                    }
                  })}
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonRow>
                    <IonCol size="12" sizeMd="3">
                      <IonText color="primary">
                        <h1>Description</h1>
                      </IonText>
                    </IonCol>
                    <IonCol size="12" sizeMd="9">
                      <p>{thisRole.projectsVacantRoles_description}</p>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="12" sizeMd="3">
                      <IonText color="primary">
                        <h1>Person Specification</h1>
                      </IonText>
                    </IonCol>
                    <IonCol size="12" sizeMd="9">
                      <p>{thisRole.projectsVacantRoles_personSpecification}</p>
                    </IonCol>
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonGrid>
          </Card>
          {!applied ? (
            <Card>
              <Heading>Apply</Heading>
              <Divider />
              <form onSubmit={handleSubmit(onSubmit)}>
                {thisRole.projectsVacantRoles_collectPhone == 1 && (
                  <Box>
                    <Text>Phone Number</Text>
                    <Input
                      type="text"
                      {...register("projectsVacantRolesApplications_phone")}
                    />
                  </Box>
                )}
                {fields.map((field, index) => {
                  return (
                    <Box key={field.id}>
                      <Text>{field.name}</Text>
                      {field.type == "textarea" ? (
                        <TextArea
                          autoCompleteType={undefined}
                          placeholder={field.placeholder}
                          w="full"
                          {...register(
                            `projectsVacantRolesApplications_questionAnswers.${index}.value` as const,
                          )}
                        />
                      ) : (
                        <Input
                          type={field.type as any}
                          placeholder={field.placeholder}
                          {...register(
                            `projectsVacantRolesApplications_questionAnswers.${index}.value` as const,
                          )}
                        />
                      )}
                    </Box>
                  );
                })}
                <Box>
                  <Text>Comments</Text>
                  <TextArea
                    autoCompleteType={undefined}
                    placeholder="Anything you'd like to add?"
                    {...register(
                      "projectsVacantRolesApplications_applicantComment",
                    )}
                  />
                </Box>
                <Button>Submit Application</Button>
              </form>
            </Card>
          ) : (
            <Card>
              <Heading>Apply</Heading>
              <Divider />
              <Text>You have already applied for this role.</Text>
            </Card>
          )}
        </ScrollView>
      </Container>
    );
  } else {
    return (
      <Container>
        <Card>
          <Heading>Role Not Found</Heading>
        </Card>
      </Container>
    );
  }
};

export default ProjectCrewApplication;
