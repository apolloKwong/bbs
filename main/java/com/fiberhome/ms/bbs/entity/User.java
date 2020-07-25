package com.fiberhome.ms.bbs.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.fiberhome.smartms.annotation.Lookup;
import com.fiberhome.smartms.annotation.Org;
import com.fiberhome.smartms.annotation.Org.Type;
import com.fiberhome.smartms.model.LongIdVO;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class User extends LongIdVO {
	private static final long serialVersionUID = 1757475622243875292L;
	private String acount;
	private String email;
	private String firstname;
	private String lastname;
	@Lookup(type = "STATUS")
	private short status;
	private String addr1;
	private String addr2;
	private String city;
	private String state;
	private String zip;
	private String country;
	private String phone;
	@Lookup(type = "LANGUAGE")
	private String languageCode;
	@JSONField(serialize = false)
	protected String password;
	@JSONField(serialize = false)
	protected String passwordSalt;
	@JSONField(serialize = false)
	private Short delFlag;
	@Org(Type.CODE)
	private String orginfo;
	protected String mobile;
	protected String fax;
	protected String address;
	protected String photo;
	@JSONField(serialize = false)
	protected Date accessionTime;
	protected String education;
	protected Short title;
	@JSONField(serialize = false)
	protected String tenantId;
	private Set<String> rights = new HashSet();

	public String getTenantId() {
		return this.tenantId;
	}

	public void setTenantId(String tenantId) {
		this.tenantId = tenantId;
	}

	public User() {
	}

	public User(Long in_userId) {
		this.setId(in_userId);
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String aValue) {
		this.password = aValue;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String aValue) {
		this.email = aValue;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String aValue) {
		this.phone = aValue;
	}

	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String aValue) {
		this.mobile = aValue;
	}

	public String getFax() {
		return this.fax;
	}

	public void setFax(String aValue) {
		this.fax = aValue;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String aValue) {
		this.address = aValue;
	}

	public String getZip() {
		return this.zip;
	}

	public void setZip(String aValue) {
		this.zip = aValue;
	}

	public String getPhoto() {
		return this.photo;
	}

	public void setPhoto(String aValue) {
		this.photo = aValue;
	}

	public Date getAccessionTime() {
		return this.accessionTime;
	}

	public String getEducation() {
		return this.education;
	}

	public void setEducation(String aValue) {
		this.education = aValue;
	}

	public Short getTitle() {
		return this.title;
	}

	public void setTitle(Short aValue) {
		this.title = aValue;
	}

	public String getFirstKeyColumnName() {
		return "userId";
	}

	public boolean isAccountNonExpired() {
		return true;
	}

	public boolean isAccountNonLocked() {
		return true;
	}

	public boolean isCredentialsNonExpired() {
		return true;
	}

	public boolean isEnabled() {
		return this.status == 1;
	}

	public String getBusinessEmail() {
		return this.email;
	}

	public Set<String> getRights() {
		return this.rights;
	}

	public Short getDelFlag() {
		return this.delFlag;
	}

	public void setDelFlag(Short delFlag) {
		this.delFlag = delFlag;
	}

	public String getAcount() {
		return this.acount;
	}

	public void setAcount(String acount) {
		this.acount = acount;
	}

	public String getFirstname() {
		return this.firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return this.lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public short getStatus() {
		return this.status;
	}

	public void setStatus(short status) {
		this.status = status;
	}

	public String getAddr1() {
		return this.addr1;
	}

	public void setAddr1(String addr1) {
		this.addr1 = addr1;
	}

	public String getAddr2() {
		return this.addr2;
	}

	public void setAddr2(String addr2) {
		this.addr2 = addr2;
	}

	public String getCity() {
		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return this.country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getOrginfo() {
		return this.orginfo;
	}

	public void setOrginfo(String orginfo) {
		this.orginfo = orginfo;
	}

	public static long getSerialversionuid() {
		return 1757475622243875292L;
	}

	public void setRights(Set<String> rights) {
		this.rights = rights;
	}

	public String getLanguageCode() {
		return this.languageCode;
	}

	public void setLanguageCode(String languageCode) {
		this.languageCode = languageCode;
	}

	public String getPasswordSalt() {
		return this.passwordSalt;
	}

	public void setPasswordSalt(String passwordSalt) {
		this.passwordSalt = passwordSalt;
	}

	public boolean isLocked() {
		return this.status != 1;
	}

	public boolean isRoot() {
		return this.id.longValue() == 0L;
	}

	public boolean isCredentialsExpired() {
		return false;
	}
}