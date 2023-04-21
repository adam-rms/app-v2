import { useEffect, useState } from "react";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from "react-hook-form";
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
  VStack,
  HStack,
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
}: DrawerScreenProps<RMSDrawerParamList, "CrewRecruitmentApplication">) => {
  const { applicationId } = route.params;
  const { projectCrewRoles, refreshProjectCrewRoles } = useProjectData();
  const toast = useToast();
  const [applied, setApplied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const doRefresh = async () => {
    setLoading(true);
    await refreshProjectCrewRoles();
    setLoading(false);
  };

  //react-hook-form
  const { handleSubmit, control } = useForm<IFormInput>();

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
        title: "Project Dates",
        value:
          thisRole.projects_dates_deliver_start +
          " - " +
          thisRole.projects_dates_deliver_end,
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
        title: "Application Deadline",
        value: thisRole.projectsVacantRoles_deadline,
      },
      {
        title: "Places Available",
        value:
          thisRole.projectsVacantRoles_slots -
          thisRole.projectsVacantRoles_slotsFilled +
          " / " +
          thisRole.projectsVacantRoles_slots,
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
            <Box p="2" alignItems="center">
              <Heading>
                {thisRole.projects_name +
                  ` - ` +
                  thisRole.projectsVacantRoles_name}
              </Heading>
            </Box>
          </Card>
          <Card>
            <Box p="4">
              <Heading alignSelf="center">Role Information</Heading>
              <Divider />
              <Container>
                <VStack width="full" space={3}>
                  <VStack size="12" space={3}>
                    {information.map((item, index) => {
                      if (item.value || item.value === "0") {
                        return (
                          <VStack key={index} size="12">
                            <Text>
                              <Heading>{item.title}</Heading>
                            </Text>
                            <Text>{item.value}</Text>
                          </VStack>
                        );
                      } else {
                        return null;
                      }
                    })}
                    <VStack>
                      <HStack size="12" space={3}>
                        <Text color="primary">
                          <Heading>Description</Heading>
                        </Text>
                      </HStack>
                      <HStack size="12">
                        <Text>{thisRole.projectsVacantRoles_description}</Text>
                      </HStack>
                    </VStack>
                    <VStack>
                      <HStack size="12">
                        <Text color="primary">
                          <Heading>Person Specification</Heading>
                        </Text>
                      </HStack>
                      <HStack size="12">
                        <Text>
                          {thisRole.projectsVacantRoles_personSpecification}
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </VStack>
              </Container>
            </Box>
          </Card>
          {!applied ? (
            <Card mb="10" p="2">
              <Heading mx="auto" mb="2">
                Apply
              </Heading>
              <Divider />
              <Container>
                {thisRole.projectsVacantRoles_collectPhone == 1 && (
                  <Box w="full" p="1">
                    <Text>Phone Number</Text>
                    <Controller
                      control={control}
                      name="projectsVacantRolesApplications_phone"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          placeholder="Phone Number"
                          onChangeText={onChange}
                          value={value}
                        />
                      )}
                    />
                  </Box>
                )}
                {fields.map((field, index) => {
                  return (
                    <Box key={field.id} w="full" p="1">
                      <Text>{field.name}</Text>
                      {field.type == "textarea" ? (
                        <Controller
                          control={control}
                          name={
                            `projectsVacantRolesApplications_questionAnswers.${index}.value` as const
                          }
                          render={({ field: { onChange, value } }) => (
                            <TextArea
                              placeholder={field.placeholder}
                              autoCompleteType={undefined}
                              onChangeText={onChange}
                              value={value}
                            />
                          )}
                        />
                      ) : (
                        <Controller
                          control={control}
                          name={
                            `projectsVacantRolesApplications_questionAnswers.${index}.value` as const
                          }
                          render={({ field: { onChange, value } }) => (
                            <Input
                              placeholder={field.placeholder}
                              onChangeText={onChange}
                              value={value}
                            />
                          )}
                        />
                      )}
                    </Box>
                  );
                })}
                <Box w="full" p="1">
                  <Text>Comments</Text>
                  <Controller
                    control={control}
                    name="projectsVacantRolesApplications_applicantComment"
                    render={({ field: { onChange, value } }) => (
                      <TextArea
                        autoCompleteType={undefined}
                        placeholder="Anything you'd like to add?"
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </Box>
                <Button
                  mt="2"
                  mx="auto"
                  bg="primary"
                  onPress={handleSubmit(onSubmit)}
                >
                  Submit Application
                </Button>
              </Container>
            </Card>
          ) : (
            <Card mb="10" p="2">
              <Heading mx="auto">Apply</Heading>
              <Divider />
              <Text mx="auto" my="5">
                You have already applied for this role.
              </Text>
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

export default CrewRecruitmentApplication;
