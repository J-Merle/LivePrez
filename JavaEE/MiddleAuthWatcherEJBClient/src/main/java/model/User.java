/*
 * JBoss, Home of Professional Open Source
 * Copyright 2013, Red Hat, Inc. and/or its affiliates, and individual
 * contributors by the @authors tag. See the copyright.txt in the
 * distribution for a full listing of individual contributors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package model;

import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import java.io.Serializable;

@Entity
@XmlRootElement
@Table(name = "User", uniqueConstraints = @UniqueConstraint(columnNames={"login"}))
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    public User() {
        super();

        if (this.getLastName() == null) {
            this.setLastName("");
        }

        if (this.getSurname() == null) {
            this.setSurname("");
        }

        if (this.getRole() == null) {
            this.setRole(Role.WATCHER);
        }
    }

    @Id
    @GeneratedValue
    private Long id;

    private String lastName;

    private String surname;

    @NotNull
    @NotEmpty
    private String login;

    @NotNull
    @NotEmpty
    private String pwd;

    private Role role;

    @Transient
    private boolean validAuth;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public boolean isValidAuth() {
        return validAuth;
    }

    public void setValidAuth(boolean validAuth) {
        this.validAuth = validAuth;
    }
}
