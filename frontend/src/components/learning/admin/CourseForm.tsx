"use client";

import { useEffect,useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import {
  Controller,
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import { z } from "zod";

import {
  useCreateCourseMutation,
  useUpdateCourseMutation,
} from "../../../redux/api/learningApi";

import type {
  LearningCourse,
} from "../../../types/learning.types";

// ==========================================
// VALIDATION
// ==========================================

const schema = z.object({
  title: z
    .string()
    .min(
      3,
      "Title must be at least 3 characters"
    ),

  description: z
    .string()
    .min(
      10,
      "Description must be at least 10 characters"
    ),

  // image: z
  //   .string()
  //   .optional(),

  category: z
    .string()
    .min(
      1,
      "Category is required"
    ),

  level: z.enum([
    "Beginner",
    "Intermediate",
    "Advanced",
  ]),

  duration: z
    .number()
    .min(
      1,
      "Duration must be at least 1 hour"
    ),

  trainer: z
    .string()
    .min(
      2,
      "Trainer is required"
    ),

  isFeatured:
    z.boolean(),

  isBestseller:
    z.boolean(),

  status: z.enum([
    "active",
    "inactive",
  ]),
});

type FormValues =
  z.infer<typeof schema>;

// ==========================================
// PROPS
// ==========================================

interface Props {
  course?: LearningCourse;

  isEdit?: boolean;

  onSuccess?: () => void;
}

// ==========================================
// COMPONENT
// ==========================================

export default function CourseForm({
  course,
  isEdit = false,
  onSuccess,
}: Props) {
  // ========================================
  // CREATE
  // ========================================

  const [
    createCourse,
    {
      isLoading: creating,
    },
  ] = useCreateCourseMutation();



const [
  imageFile,
  setImageFile,
] = useState<File | null>(
  null
);

const [
  imagePreview,
  setImagePreview,
] = useState<string>("");




  // ========================================
  // UPDATE
  // ========================================

  const [
    updateCourse,
    {
      isLoading: updating,
    },
  ] = useUpdateCourseMutation();

  // ========================================
  // FORM
  // ========================================

  const {
    control,
    register,
    reset,
    handleSubmit,

    formState: {
      errors,
    },
  } = useForm<FormValues>({
    resolver:
      zodResolver(schema),

    defaultValues: {
      title: "",

      description: "",

      // image: "",

      category: "",

      level: "Beginner",

      duration: 1,

      trainer: "",

      isFeatured: false,

      isBestseller: false,

      status: "active",
    },
  });

  // ========================================
  // EDIT DEFAULT VALUES
  // ========================================

  useEffect(() => {
    if (
      course &&
      isEdit
    ) {
      reset({
        title:
          course.title ?? "",

        description:
          course.description ?? "",

        // image:
        //   course.image ?? "",

        category:
          course.category ?? "",

        level:
          course.level ??
          "Beginner",

        duration:
          course.duration ?? 1,

        trainer:
          course.trainer ?? "",

        isFeatured:
          course.isFeatured ??
          false,

        isBestseller:
          course.isBestseller ??
          false,

        status:
          course.status ??
          "active",
      });
    }
  }, [
    course,
    isEdit,
    reset,
  ]);

  // ========================================
  // LOADING
  // ========================================

  const loading =
    creating || updating;

  // ========================================
  // SUBMIT
  // ========================================

  const onSubmit = async (
    values: FormValues
  ) => {
    try {
      console.log(
        "COURSE FORM VALUES:",
        values
      );

      // ====================================
      // UPDATE
      // ====================================

      if (
        isEdit &&
        course
      ) {
        const response =
          await updateCourse({
            id: course._id,

            data: values,
          }).unwrap();

        console.log(
          "UPDATE COURSE SUCCESS:",
          response
        );
      }

      // ====================================
      // CREATE
      // ====================================

      else {
        const response =
          await createCourse(
            values
          ).unwrap();

        console.log(
          "CREATE COURSE SUCCESS:",
          response
        );
      }

      // ====================================
      // SUCCESS CALLBACK
      // ====================================

      onSuccess?.();

      // ====================================
      // RESET CREATE FORM
      // ====================================

      if (!isEdit) {
        reset();
      }
    } catch (error) {
      console.error(
        "COURSE SUBMIT ERROR:",
        error
      );
    }
  };

  // ========================================
  // UI
  // ========================================

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,

        border:
          "1px solid",

        borderColor:
          "divider",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
          }}
        >
          {isEdit
            ? "Update Course"
            : "Create Course"}
        </Typography>

        {/* =================================
            FORM
        ================================= */}

        <Box
          component="form"

          // THIS WAS MISSING
          onSubmit={
            handleSubmit(
              onSubmit
            )
          }

          noValidate
        >
          <Grid
            container
            spacing={3}
          >
            {/* =============================
                TITLE
            ============================= */}

            <Grid
              size={{
                xs: 12,
              }}
            >
              <TextField
                fullWidth
                label="Course Title"

                {...register(
                  "title"
                )}

                error={
                  !!errors.title
                }

                helperText={
                  errors.title
                    ?.message
                }
              />
            </Grid>

            {/* =============================
                DESCRIPTION
            ============================= */}

            <Grid
              size={{
                xs: 12,
              }}
            >
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Description"

                {...register(
                  "description"
                )}

                error={
                  !!errors.description
                }

                helperText={
                  errors.description
                    ?.message
                }
              />
            </Grid>

            {/* =============================
                IMAGE
            ============================= */}
{/* 
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                label="Image URL"

                {...register(
                  "image"
                )}

                error={
                  !!errors.image
                }

                helperText={
                  errors.image
                    ?.message
                }
              />
            </Grid> */}


            <Grid
  size={{
    xs: 12,
    md: 6,
  }}
>
  <Stack spacing={2}>
    <Button
      component="label"
      variant="outlined"
    >
      Choose Course Image

      <input
        hidden
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={(event) => {
          const file =
            event.target.files?.[0];

          if (!file) {
            return;
          }

          setImageFile(file);

          const preview =
            URL.createObjectURL(
              file
            );

          setImagePreview(
            preview
          );
        }}
      />
    </Button>

    {imageFile && (
      <Typography
        variant="body2"
        color="text.secondary"
      >
        {imageFile.name}
      </Typography>
    )}

    {imagePreview && (
      <Box
        component="img"
        src={imagePreview}
        alt="Course preview"
        sx={{
          width: 160,
          height: 110,
          objectFit: "cover",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      />
    )}
  </Stack>
</Grid>

            {/* =============================
                TRAINER
            ============================= */}

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <TextField
                fullWidth
                label="Trainer"

                {...register(
                  "trainer"
                )}

                error={
                  !!errors.trainer
                }

                helperText={
                  errors.trainer
                    ?.message
                }
              />
            </Grid>

            {/* =============================
                CATEGORY
            ============================= */}

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Controller
                control={control}
                name="category"

                render={({
                  field,
                }) => (
                  <TextField
                    {...field}

                    fullWidth
                    select

                    label="Category"

                    error={
                      !!errors.category
                    }

                    helperText={
                      errors
                        .category
                        ?.message
                    }
                  >
                    <MenuItem
                      value="Crop Production"
                    >
                      Crop Production
                    </MenuItem>

                    <MenuItem
                      value="Soil Health"
                    >
                      Soil Health
                    </MenuItem>

                    <MenuItem
                      value="Organic Farming"
                    >
                      Organic Farming
                    </MenuItem>

                    <MenuItem
                      value="Irrigation"
                    >
                      Irrigation
                    </MenuItem>

                    <MenuItem
                      value="Livestock"
                    >
                      Livestock
                    </MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            {/* =============================
                LEVEL
            ============================= */}

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Controller
                control={control}
                name="level"

                render={({
                  field,
                }) => (
                  <TextField
                    {...field}

                    fullWidth
                    select

                    label="Level"

                    error={
                      !!errors.level
                    }

                    helperText={
                      errors.level
                        ?.message
                    }
                  >
                    <MenuItem
                      value="Beginner"
                    >
                      Beginner
                    </MenuItem>

                    <MenuItem
                      value="Intermediate"
                    >
                      Intermediate
                    </MenuItem>

                    <MenuItem
                      value="Advanced"
                    >
                      Advanced
                    </MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            {/* =============================
                DURATION
            ============================= */}

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Controller
                control={control}
                name="duration"

                render={({
                  field,
                }) => (
                  <TextField
                    fullWidth

                    type="number"

                    label="Duration (Hours)"

                    value={
                      field.value
                    }

                    inputRef={
                      field.ref
                    }

                    onBlur={
                      field.onBlur
                    }

                    onChange={(
                      event
                    ) => {
                      const value =
                        Number(
                          event
                            .target
                            .value
                        );

                      field.onChange(
                        value
                      );
                    }}

                    error={
                      !!errors.duration
                    }

                    helperText={
                      errors
                        .duration
                        ?.message
                    }

                    slotProps={{
                      htmlInput: {
                        min: 1,
                      },
                    }}
                  />
                )}
              />
            </Grid>

            {/* =============================
                FEATURED
            ============================= */}

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Controller
                control={control}
                name="isFeatured"

                render={({
                  field,
                }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={
                          field.value
                        }

                        onChange={(
                          event
                        ) =>
                          field.onChange(
                            event
                              .target
                              .checked
                          )
                        }
                      />
                    }

                    label="Featured Course"
                  />
                )}
              />
            </Grid>

            {/* =============================
                BESTSELLER
            ============================= */}

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Controller
                control={control}
                name="isBestseller"

                render={({
                  field,
                }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={
                          field.value
                        }

                        onChange={(
                          event
                        ) =>
                          field.onChange(
                            event
                              .target
                              .checked
                          )
                        }
                      />
                    }

                    label="Bestseller"
                  />
                )}
              />
            </Grid>

            {/* =============================
                STATUS
            ============================= */}

            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <Controller
                control={control}
                name="status"

                render={({
                  field,
                }) => (
                  <TextField
                    {...field}

                    fullWidth
                    select

                    label="Status"

                    error={
                      !!errors.status
                    }

                    helperText={
                      errors.status
                        ?.message
                    }
                  >
                    <MenuItem
                      value="active"
                    >
                      Active
                    </MenuItem>

                    <MenuItem
                      value="inactive"
                    >
                      Inactive
                    </MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            {/* =============================
                BUTTONS
            ============================= */}

            <Grid
              size={{
                xs: 12,
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent:
                    "flex-end",
                }}
              >
                <Button
                  type="button"

                  variant="outlined"

                  disabled={
                    loading
                  }

                  onClick={() =>
                    reset()
                  }
                >
                  Reset
                </Button>

                <Button
                  type="submit"

                  variant="contained"

                  disabled={
                    loading
                  }
                >
                  {loading
                    ? isEdit
                      ? "Updating..."
                      : "Creating..."
                    : isEdit
                    ? "Update Course"
                    : "Create Course"}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}