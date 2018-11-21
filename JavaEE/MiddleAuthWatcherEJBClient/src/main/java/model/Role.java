package model;

public enum Role {
    NONE(""),
    ADMIN("ADMIN"),
    ;

    private final String roleCode;

    Role(String roleCode) {
        this.roleCode = roleCode;
    }
}
