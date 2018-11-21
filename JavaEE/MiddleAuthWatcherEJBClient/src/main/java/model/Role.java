package model;

public enum Role {
    NONE(""),
    CREATOR("CREATOR"),
    WATCHER("WATCHER"),
    ADMIN("ADMIN"),
    ;

    private final String roleCode;

    Role(String roleCode) {
        this.roleCode = roleCode;
    }
}
