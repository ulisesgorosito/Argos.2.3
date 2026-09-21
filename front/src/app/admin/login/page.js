"use client";

import { useState } from "react";

export default function Login() {

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                credentials: "include",
                body: new URLSearchParams({
                    usuario,
                    password
                })
            }
        );

        if (!response.ok) {
            setError("Usuario o contraseña incorrectos");

            console.log(
                "Error en la respuesta de la API:",
                response.status,
                response.statusText
            );

            return;
        }

        window.location.href = "/";
        }
        catch (error) {
            console.error("Error al enviar la solicitud de inicio de sesión:", error);
            setError("Ocurrió un error al iniciar sesión. Por favor, inténtelo de nuevo.");
        }
    };

    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <div className="row">
                <div className="col-md-6 offset-md-3">

                    <h2 className="text-center mb-4">
                        Iniciar Sesión
                    </h2>

                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3 row">
                            <div className="col-sm-12">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputUser"
                                    placeholder="Usuario"
                                    name="usuario"
                                    value={usuario}
                                    onChange={(event) =>
                                        setUsuario(event.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-3 row">
                            <div className="col-sm-12">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword"
                                    placeholder="Contraseña"
                                    name="password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Ingresar
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
}
