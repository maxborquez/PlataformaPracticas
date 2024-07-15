import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";

const DatosEmpresa = ({
  regiones,
  provincias,
  comunas,
  onRegionChange,
  onProvinciaChange,
  onStepComplete,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext();

  const regionSeleccionada = watch("regionSeleccionada");
  const provinciaSeleccionada = watch("provinciaSeleccionada");
  const comunaSeleccionada = watch("comunaSeleccionada");

  useEffect(() => {
    onStepComplete(validateFields());
  }, [onStepComplete]);

  const validateFields = () => {
    const nombreEmpresa = watch("nombreEmpresa");
    const deptoArea = watch("deptoArea");
    const rubro = watch("rubro");
    const fonoEmpresa = watch("fonoEmpresa");
    const direccionEmpresa = watch("direccionEmpresa");
    const region = regionSeleccionada;
    const provincia = provinciaSeleccionada;
    const comuna = comunaSeleccionada;

    return (
      nombreEmpresa &&
      deptoArea &&
      rubro &&
      fonoEmpresa &&
      direccionEmpresa &&
      region &&
      provincia &&
      comuna
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Datos de empresa
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Nombre de la Empresa"
          {...register("nombreEmpresa", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^[a-zA-Z\s]{0,40}$/,
              message: "Nombre inválido. Solo letras y máximo 40 caracteres.",
            },
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.nombreEmpresa}
          helperText={errors.nombreEmpresa?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Departamento o Área"
          {...register("deptoArea", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^[a-zA-Z\s]{0,15}$/,
              message:
                "Departamento o área inválido. Solo letras y máximo 15 caracteres.",
            },
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.deptoArea}
          helperText={errors.deptoArea?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Página Web"
          {...register("paginaWeb", {
            pattern: {
              value: /^[a-zA-Z.\s]{0,30}$/,
              message:
                "Página web inválida. Solo letras, puntos y máximo 30 caracteres.",
            },
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.paginaWeb}
          helperText={errors.paginaWeb?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Rubro"
          {...register("rubro", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^[a-zA-Z\s]{0,30}$/,
              message: "Rubro inválido. Solo letras y máximo 30 caracteres.",
            },
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.rubro}
          helperText={errors.rubro?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Fono de la Empresa"
          type="text"
          placeholder="9xxxxxxxx"
          inputProps={{ maxLength: 9 }}
          {...register("fonoEmpresa", {
            required: "Este campo es obligatorio",
            pattern: {
              value: /^\d{0,9}$/,
              message: "Fono inválido. Solo números y máximo 9 dígitos.",
            },
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.fonoEmpresa}
          helperText={errors.fonoEmpresa?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Dirección de la Empresa"
          {...register("direccionEmpresa", {
            required: "Este campo es obligatorio",
            maxLength: {
              value: 20,
              message: "Dirección inválida. Máximo 20 caracteres.",
            },
          })}
          variant="outlined"
          margin="normal"
          error={!!errors.direccionEmpresa}
          helperText={errors.direccionEmpresa?.message}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="region-label">Región</InputLabel>
          <Select
            labelId="region-label"
            {...register("regionSeleccionada", {
              required: "Este campo es obligatorio",
            })}
            value={regionSeleccionada || ""}
            label="Región"
            onChange={(e) => {
              setValue("regionSeleccionada", e.target.value);
              onRegionChange(e.target.value); // Llama a la función para actualizar las provincias
            }}
          >
            <MenuItem value="" disabled>
              Seleccione una región
            </MenuItem>
            {regiones.map((region) => (
              <MenuItem key={region.id_region} value={region.id_region}>
                {region.nombre_region}
              </MenuItem>
            ))}
          </Select>

          {errors.regionSeleccionada && (
            <Typography variant="body2" color="error">
              {errors.regionSeleccionada.message}
            </Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="provincia-label">Provincia</InputLabel>
          <Select
            labelId="provincia-label"
            {...register("provinciaSeleccionada", {
              required: "Este campo es obligatorio",
            })}
            value={provinciaSeleccionada || ""}
            label="Provincia"
            onChange={(e) => {
              setValue("provinciaSeleccionada", e.target.value);
              onProvinciaChange(e.target.value); // Llama a la función para actualizar las comunas
            }}
          >
            <MenuItem value="" disabled>
              Seleccione una provincia
            </MenuItem>
            {provincias.map((provincia) => (
              <MenuItem
                key={provincia.id_provincia}
                value={provincia.id_provincia}
              >
                {provincia.nombre_provincia}
              </MenuItem>
            ))}
          </Select>

          {errors.provinciaSeleccionada && (
            <Typography variant="body2" color="error">
              {errors.provinciaSeleccionada.message}
            </Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="comuna-label">Comuna</InputLabel>
          <Select
            labelId="comuna-label"
            {...register("comunaSeleccionada", {
              required: "Este campo es obligatorio",
            })}
            value={comunaSeleccionada || ""}
            label="Comuna"
          >
            <MenuItem value="" disabled>
              Seleccione una comuna
            </MenuItem>
            {comunas.map((comuna) => (
              <MenuItem key={comuna.id_comuna} value={comuna.id_comuna}>
                {comuna.nombre}
              </MenuItem>
            ))}
          </Select>
          {errors.comunaSeleccionada && (
            <Typography variant="body2" color="error">
              {errors.comunaSeleccionada.message}
            </Typography>
          )}
        </FormControl>
      </Grid>
    </Grid>
  );
};

DatosEmpresa.propTypes = {
  regiones: PropTypes.array.isRequired,
  provincias: PropTypes.array.isRequired,
  comunas: PropTypes.array.isRequired,
  onRegionChange: PropTypes.func.isRequired,
  onProvinciaChange: PropTypes.func.isRequired,
  onStepComplete: PropTypes.func.isRequired,
};

export default DatosEmpresa;
